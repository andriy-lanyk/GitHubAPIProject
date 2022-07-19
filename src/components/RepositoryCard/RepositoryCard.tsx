import {FC} from "react";

import styles from './RepositoryCard.module.scss';

interface IRepositoryCard {
  repoUrl: string;
  repoName: string;
  forksCount: number;
  starsCount: number;
}

const RepositoryCard: FC<IRepositoryCard> = ({
  repoUrl,
  repoName,
  forksCount,
  starsCount,
}) => {
  return (
    <div className={styles.repositoryCard}>
      <a
      href={repoUrl}
      target="_blank"
      rel="noreferrer"
      className={styles.repositoryCard__link}
    >
        <h3>{repoName}</h3>
        <div className={styles.repositoryCard__container}>
          <p>{forksCount} Forks</p>
          <p>{starsCount} Stars</p>
        </div>
    </a>
    </div>
  );
};

export default RepositoryCard;