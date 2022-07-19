import axios from "axios";
import { FC, useState, useEffect } from "react";

import Loader from '../Loader';
import axiosInstance from '../../services/axiosInstance';

import styles from './UserCard.module.scss';

interface IUserCard {
  imgUrl: string;
  userName: string;
  userRepoUrl: string;
}

const UserCard: FC<IUserCard> = ({
  imgUrl,
  userName,
  userRepoUrl,
}) => {
  const [numberOfRepo, setNumberOfRepo] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
    useEffect( () => {
    const source = axios.CancelToken.source();
    const cancelToken = source.token;
    const getNumberOfUserRepos = async () => {
      if (userRepoUrl) {
        try {
          setIsLoading(true)
          // const { data } = await axios.get(userRepoUrl, {
          //   cancelToken: cancelToken,
          // });
          const { data } = await axiosInstance({
          method:'GET',
          url: userRepoUrl,
          cancelToken: cancelToken,
        })
          setNumberOfRepo(data.length);
          setIsLoading(false);
        } catch (error) {
          if (axios.isCancel(error)) {
            return;
          }
          setIsLoading(false);
        }
      }
    };
    getNumberOfUserRepos();
    return () => {
      source.cancel();
    };
  }, [userRepoUrl]);
  return (
      <div className={ styles.userCard }>
          <img src={ imgUrl } width="60" height="60" alt={userName } />
          <p>{`User-name: ${userName}`}</p>
          {isLoading ? (
            <Loader />
          ) : (
            <p>{`Repo: ${numberOfRepo}`}</p>
          )}
    </div>
  );
};

export default UserCard;