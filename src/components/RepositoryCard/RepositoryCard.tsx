import {FC} from "react";

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
    <a
      href={repoUrl}
      target="_blank"
      rel="noreferrer"
    >
        <span>{repoName}</span>
        <div>
          <p>{forksCount} Forks</p>
          <p>{starsCount} Stars</p>
        </div>
    </a>
  );
};

export default RepositoryCard;