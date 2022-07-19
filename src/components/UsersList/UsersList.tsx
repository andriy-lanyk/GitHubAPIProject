import { FC, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import UserCard from '../UserCard';
import Loader from '../Loader';

import axiosInstance from '../../services/axiosInstance';
import useDebounce from '../../hooks/customDebounce';
import {
	NOT_AUTHORIZED,
	LIMIT_EXCEEDED,
	ERROR_MESSAGE,
	NOT_HAVE,
} from '../../constants/constants';

import { IUsersResponse } from '../../interfaces/APIresponse';
import { IUser } from '../../interfaces/user';

interface IUsersList {
	inputValue: string;
}

interface IUserResp {
	data: IUser[];
}

const UsersList: FC<IUsersList> = ({ inputValue }) => {
	const [users, setUsers] = useState<IUser[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const debouncedValue = useDebounce(inputValue, 500);

	const getUsers = useCallback(async () => {
		if (error) {
			setError(false);
		}

		if (debouncedValue) {
			try {
				setIsLoading(true);
				const { data }: IUsersResponse = await axiosInstance({
					method: 'GET',
					url: `/search/users?q=${debouncedValue}`,
				});

				if (data) {
					setUsers(data.items);
					setIsLoading(false);
				}
			} catch (error: any) {
				setError(true);
				setIsLoading(false);
				console.log('error.response.status: ', error);
				if (error.response.status === 401) {
					toast.warn(NOT_AUTHORIZED, {
						theme: 'colored',
					});
				}
				if (error.response.status === 403) {
					toast.warn(LIMIT_EXCEEDED, {
						theme: 'colored',
					});
				}
			}
		} else {
			try {
				setIsLoading(true);
				const { data }: IUserResp = await axiosInstance({
					method: 'GET',
					url: `/users`,
				});

				if (data) {
					setUsers(data);
					setIsLoading(false);
				}
			} catch (error: any) {
				setError(true);
				setIsLoading(false);
				console.log('error.response.status: ', error);
				if (error.response.status === 401) {
					toast.warn(NOT_AUTHORIZED, {
						theme: 'colored',
					});
				}
				if (error.response.status === 403) {
					toast.warn(LIMIT_EXCEEDED, {
						theme: 'colored',
					});
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedValue]);

	useEffect(() => {
		getUsers();
		localStorage.setItem('filterGitHubUsers', JSON.stringify(debouncedValue));
	}, [debouncedValue, getUsers]);

	if (error) {
		return <p className='error'>{ERROR_MESSAGE}</p>;
	}

	return isLoading ? (
		<Loader />
	) : (
		<div>
			{users && users.length > 0 ? (
				users.map((user: IUser) => {
					const { avatar_url, login, id, repos_url } = user;
					return (
						<Link key={id} to={`/user/${login}`}>
							<UserCard
								imgUrl={avatar_url}
								userName={login}
								userRepoUrl={repos_url}
							/>
						</Link>
					);
				})
			) : (
				<p className='notFound'>{NOT_HAVE}</p>
			)}
		</div>
	);
};

export default UsersList;
