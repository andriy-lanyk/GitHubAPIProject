import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loader from '../components/Loader';
import UserDetail from '../components/UserDetail';

// import octokitFetch from '../services/octokitFetch';
import axiosInstance from '../services/axiosInstance';

import {
	GO_BACK,
	ERROR_MESSAGE,
	NOT_AUTHORIZED,
	LIMIT_EXCEEDED,
} from '../constants/constants';
import { IUserDetail } from '../interfaces/user';

const UserPage: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [user, setUser] = useState<IUserDetail | null>(null);
	const { login } = useParams<{ login?: string }>();
	const navigate = useNavigate();

	useEffect(() => {
		const getUserData = async () => {
			if (error) {
				setError(false);
			}

			try {
				setIsLoading(true);
				// const { data } = await octokitFetch(`/users/${login}`, {
				// 	username: `${login}`,
				// });
				const { data } = await axiosInstance({
					method: 'GET',
					url: `/users/${login}`,
				});
				console.log('data in UserPage: ', data);
				setUser(data);
				setIsLoading(false);
			} catch (error: any) {
				setUser(null);
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
		};
		getUserData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [login]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<button className='goBack' onClick={() => navigate('/GitHubAPIProject')}>
				&#8678; {GO_BACK}
			</button>
			{error && <p className='error'>{ERROR_MESSAGE}</p>}
			{user && <UserDetail userData={user} userName={login} />}
		</>
	);
};

export default UserPage;
