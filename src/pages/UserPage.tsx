import {FC, useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import UserDetail from "../components/UserDetail";

import { BASE_URL } from '../constants/constants';
import { IUserDetail } from "../interfaces/user";

interface IUserResponse {
  data: IUserDetail;
}

const UserPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUserDetail | null>(null);
  const { login } = useParams<{ login?: string }>();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data }: IUserResponse = await axios.get(
          `${BASE_URL}/users/${login}`
        );
        console.log('data: ', data);
        setUser(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [login]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{user && <UserDetail userData={user} userName={login} />}</>;
};

export default UserPage;