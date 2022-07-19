import { FC, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import UserCard from "../UserCard";
import Loader from "../Loader";

import axiosInstance from '../../services/axiosInstance';
import useDebounce from '../../hooks/customDebounce';

import { IUsersResponse } from '../../interfaces/APIresponse';
import { IUser } from "../../interfaces/user";

interface IUsersList {
    inputValue: string;
}

interface IUserResp {
  data: IUser[]
}

const UsersList: FC<IUsersList> = ( { inputValue } ) => {
    const [users, setUsers] = useState<IUser[] | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>( false );
    const debouncedValue = useDebounce(inputValue, 500);
    console.log('inputValue: ', inputValue);
    
    const getUsers = useCallback(async () => {
    console.log('debouncedValue: ', debouncedValue);
    if ( debouncedValue ) {
      try {
        setIsLoading(true);
        const { data }: IUsersResponse = await axiosInstance({
          
          method:'GET',
          url: `/search/users?q=${debouncedValue}`,
        })
        
        if (data) {
          
          setUsers(data.items);
          
          setIsLoading(false);
        }
      } catch (err: any) {
        if (err.response.status === 401) {
          // window.alert("You are not authorized");
          setIsLoading(false);
        }
        if (err.response.status === 403) {
          // window.alert("The number of requests has run out, reload the page");
          setIsLoading(false);
        }
      }
    } else {
      try {
        setIsLoading(true);
        const { data }: IUserResp = await axiosInstance({
          method:'GET',
          url: `/users`,
        } )
        console.log('data in else: ', data);
        
        if (data) {
          setUsers(data);
          setIsLoading(false);
        }
      } catch (err: any) {
        if (err.response.status === 401) {
          // window.alert("You are not authorized");
          setIsLoading(false);
        }
        if (err.response.status === 403) {
          // window.alert("The number of requests has run out, reload the page");
          setIsLoading(false);
        }
      }
    }
    }, [ debouncedValue ] );

    useEffect( () => {
        getUsers();
    }, [debouncedValue, getUsers])
    
    return isLoading ? <Loader /> : <div>{ users && users.length > 0 ? users.map( ( user: IUser ) => {
        const { avatar_url, login, id, repos_url } = user;
        return (
            <Link key={ id } to={ `/user/${ login }` }>
                <UserCard
                    imgUrl={ avatar_url }
                    userName={ login }
                    userRepoUrl={ repos_url }
                />
            </Link>
        );
    } ) : <p className="notFound">We don't have such users...</p>}</div>
}

export default UsersList;