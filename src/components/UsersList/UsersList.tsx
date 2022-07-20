import { FC, useState, useEffect, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import UserCard from '../UserCard';
import Loader from '../Loader';

// import octokitFetch from '../../services/octokitFetch';
import axiosInstance from '../../services/axiosInstance';
import useDebounce from '../../hooks/customDebounce';
import {
	NOT_AUTHORIZED,
	LIMIT_EXCEEDED,
	ERROR_MESSAGE,
	NOT_HAVE,
} from '../../constants/constants';
import { SearchContext } from '../../context/searchContext';

import { IUser } from '../../interfaces/user';
import { SearchContextType } from '../../interfaces/contextType';

interface IUsersList {
	inputValue: string;
}

const UsersList: FC<IUsersList> = ({ inputValue }) => {
	const [users, setUsers] = useState<IUser[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const debouncedValue = useDebounce(inputValue, 500);
	const { changeValue } = useContext(SearchContext) as SearchContextType;

	const getUsers = useCallback(async () => {
		if (error) {
			setError(false);
		}

		if (debouncedValue) {
			try {
				setIsLoading(true);
				// const { data } = await octokitFetch(
				// 	`/search/users?q=${debouncedValue}`,
				// );

				const { data } = await axiosInstance({
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
				if (error.status === 401) {
					toast.warn(NOT_AUTHORIZED, {
						theme: 'colored',
					});
				}
				if (error.status === 403) {
					toast.warn(LIMIT_EXCEEDED, {
						theme: 'colored',
					});
				}
			}
		} else {
			try {
				setIsLoading(true);
				// const { data } = await octokitFetch('/users');
				const { data } = await axiosInstance({
					method: 'GET',
					url: '/users',
				});

				if (data) {
					setUsers(data);
					setIsLoading(false);
				}
			} catch (error: any) {
				setError(true);
				setIsLoading(false);
				if (error.status === 401) {
					toast.warn(NOT_AUTHORIZED, {
						theme: 'colored',
					});
				}
				if (error.status === 403) {
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
		changeValue(debouncedValue);
	}, [debouncedValue, getUsers, changeValue]);

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
