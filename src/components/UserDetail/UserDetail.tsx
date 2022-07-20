import { FC, useState, useEffect } from 'react';
import moment from 'moment';

import Input from '../Input';
import RepositoryCard from '../RepositoryCard';

import { IRepository } from '../../interfaces/repository';
import { IUserDetail } from '../../interfaces/user';

// import octokitFetch from '../../services/octokitFetch';
import axiosInstance from '../../services/axiosInstance';

import {
	NO_REPO,
	NO_BIOGRAPHY,
	ERROR_MESSAGE,
} from '../../constants/constants';
import styles from './UserDetail.module.scss';

interface IAboutUser {
	userData: IUserDetail;
	userName: string | undefined;
}

const UserDetail: FC<IAboutUser> = ({ userData, userName }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');
	const [userRepos, setUserRepos] = useState<IRepository[]>();
	const handleInputChange = (e: any) => {
		setInputValue(e.currentTarget.value);
	};

	useEffect(() => {
		if (error) {
			setError(false);
		}
		const getUserRepo = async () => {
			try {
				setIsLoading(true);
				// const { data } = await octokitFetch(`/users/${userName}/repos`, {
				// 	username: `${userName}`,
				// });
				const { data } = await axiosInstance({
					method: 'GET',
					url: `/users/${userName}/repos`,
				});
				console.log('data in UserDetail: ', data);
				if (data) {
					setUserRepos(data);
				}
				setIsLoading(false);
			} catch (error) {
				setError(true);
				setIsLoading(false);
			}
		};
		getUserRepo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userName]);

	const {
		avatar_url,
		email,
		login,
		created_at,
		followers,
		following,
		location,
		bio,
	} = userData;

	if (error) {
		<p className='error'>{ERROR_MESSAGE}</p>;
	}

	return (
		<>
			<div className={styles.detailInfo}>
				<img
					className={styles.detailInfo__img}
					src={avatar_url}
					width='350'
					height='350'
					alt={login}
				/>
				<div className={styles.detailInfo__text}>
					<p>
						<span className={styles.detailInfo__subTitle}>UserName:</span>{' '}
						{login}
					</p>
					<p>
						<span className={styles.detailInfo__subTitle}>Email:</span>
						{email ? email : ' No Email'}
					</p>
					<p>
						<span className={styles.detailInfo__subTitle}>Loaction:</span>{' '}
						{location ? location : ' No Location'}
					</p>
					<p>
						<span className={styles.detailInfo__subTitle}>Join Date:</span>{' '}
						{moment(created_at).format('DD-MM-YYYY')}
					</p>
					<p>
						{followers} -{' '}
						<span className={styles.detailInfo__subTitle}>Followers</span>
					</p>
					<p>
						<span className={styles.detailInfo__subTitle}>Following</span> -{' '}
						{following}
					</p>
				</div>
			</div>
			<div className={styles.detailInfo__biography}>
				<h2>Biography:</h2>
				<p>{bio ? bio : NO_BIOGRAPHY}</p>
			</div>
			<form>
				<Input
					inputValue={inputValue}
					onChange={handleInputChange}
					placeholderText={"Search for User's repositories"}
				/>
			</form>

			<div>
				{isLoading ? (
					<div className={styles.detailInfo__load}></div>
				) : userRepos ? (
					userRepos.map((repo: IRepository) => {
						const { id, name, html_url, stargazers_count, forks_count } = repo;
						if (name.includes(inputValue)) {
							return (
								<RepositoryCard
									key={id}
									repoUrl={html_url}
									repoName={name}
									starsCount={stargazers_count}
									forksCount={forks_count}
								/>
							);
						}
						return '';
					})
				) : (
					<p>{NO_REPO}</p>
				)}
			</div>
		</>
	);
};

export default UserDetail;
