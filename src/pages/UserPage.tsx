import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loader from '../components/Loader';
import UserDetail from '../components/UserDetail';

import {
	BASE_URL,
	GO_BACK,
	ERROR_MESSAGE,
	NOT_AUTHORIZED,
	LIMIT_EXCEEDED,
} from '../constants/constants';
import { IUserDetail } from '../interfaces/user';

interface IUserResponse {
	data: IUserDetail;
}

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
				const { data }: IUserResponse = await axios.get(
					`${BASE_URL}/users/${login}`,
				);
				setUser(data);
				setIsLoading(false);
			} catch (error: any) {
				setUser(null);
				setError(true);
				setIsLoading(false);
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
		};
		getUserData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [login]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<button className='goBack' onClick={() => navigate('/')}>
				&#8678; {GO_BACK}
			</button>
			{error && <p className='error'>{ERROR_MESSAGE}</p>}
			{user && <UserDetail userData={user} userName={login} />}
		</>
	);
};

export default UserPage;
