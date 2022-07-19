import {FC, useState, useEffect} from "react";
import axios from "axios";
// import moment from "moment";

import Container from '../Container';
import Title from "../Title";
import Input from "../Input";
import RepositoryCard from "../RepositoryCard";

import { IRepository } from "../../interfaces/repository";
import { IRepositoryResponse } from "../../interfaces/APIresponse";
import { IUserDetail } from "../../interfaces/user";

import { BASE_URL } from "../../constants/constants";

interface IAboutUser {
  userData: IUserDetail;
  userName: string | undefined;
}

const UserDetail: FC<IAboutUser> = ({ userData, userName }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [userRepos, setUserRepos] = useState<IRepository[]>();
  const handleInputChange = (e: any) => {
    setInputValue(e.currentTarget.value);
  };

  useEffect(() => {
    const getUserRepo = async () => {
      try {
        const { data }: IRepositoryResponse = await axios.get(
          `${BASE_URL}/users/${userName}/repos`
        );
        setUserRepos(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserRepo();
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
  return (
    <Container>
      <Title />
          <img src={ avatar_url } width="350" height="350" alt={login } />
          <div>
              <p className="bio-text">UserName: {login}</p>
          <p className="bio-text">Email:{email ? email : " No Email"}</p>
          <p className="bio-text">
            Loaction: {location ? location : " No Location"}
          </p>
          <p className="bio-text">
            Join At: {created_at}
          </p>
          <p className="bio-text">{followers} - Followers</p>
          <p className="bio-text">Following - {following}</p>
          </div>
          <div>
              <h3>Bio:</h3>
        <p>{bio ? bio : "This user does not have bio"}</p>
          </div>
        
      <Input
        inputValue={inputValue}
        onChange={handleInputChange}
        placeholderText={"Search for User's repositories"}
      />
      <div className="mt-3 pb-2">
        {userRepos ? (
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
          <p>No data</p>
        )}
      </div>
    </Container>
  );
};

export default UserDetail;