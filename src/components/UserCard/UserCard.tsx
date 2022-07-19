import { FC, useState, useEffect } from 'react';

import axiosInstance from '../../services/axiosInstance';

import styles from './UserCard.module.scss';

interface IUserCard {
	imgUrl: string;
	userName: string;
	userRepoUrl: string;
}

const UserCard: FC<IUserCard> = ({ imgUrl, userName, userRepoUrl }) => {
	const [numberOfRepo, setNumberOfRepo] = useState<number>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const getNumberOfUserRepos = async () => {
			if (userRepoUrl) {
				try {
					setIsLoading(true);
					const { data } = await axiosInstance({
						method: 'GET',
						url: userRepoUrl,
					});
					setNumberOfRepo(data.length);
					setIsLoading(false);
				} catch (error: any) {
					console.log('error in userCard: ', error);
					setIsLoading(false);
				}
			}
		};
		getNumberOfUserRepos();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userRepoUrl]);

	return (
		<div className={styles.userCard}>
			<img className={styles.userCard__image} src={imgUrl} alt={userName} />
			<p className={styles.userCard__title}>{userName}</p>
			<div className={styles.userCard__repository}>
				{isLoading ? (
					<div className={styles.userCard__load}></div>
				) : (
					numberOfRepo && `Repository: ${numberOfRepo}`
				)}
			</div>
		</div>
	);
};

export default UserCard;
