import { FC, useState, useEffect, useCallback, useDeferredValue } from "react";
// import { Link } from 'react-router-dom';

import Container from '../components/Container';
import Title from "../components/Title";
import Input from "../components/Input";
import UsersList from '../components/UsersList';
// import Loader from "../components/Loader";
// import UserCard from "../components/UserCard";
// import axiosInstance from '../services/axiosInstance';

// import { IUser } from "../interfaces/user";
// import { IUsersResponse } from '../interfaces/APIresponse';

const Home: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleInputChange = (e: any) => {
    setSearchValue(e.currentTarget.value);
  };

  // const getUsers = useCallback(async () => {
  //   console.log('defferedInput: ', defferedInput);
  //   if ( defferedInput ) {
  //     try {
  //       setIsLoading(true);
  //       const { data }: IUsersResponse = await axiosInstance({
  //         method:'GET',
  //         url: `/search/users?q=${defferedInput}`,
  //       })
  //       console.log('data: ', data);
        
  //       if (data) {
  //         setUsers(data.items);
  //         setIsLoading(false);
  //       }
  //     } catch (err: any) {
  //       if (err.response.status === 401) {
  //         // window.alert("You are not authorized");
  //         setIsLoading(false);
  //       }
  //       if (err.response.status === 403) {
  //         // window.alert("The number of requests has run out, reload the page");
  //         setIsLoading(false);
  //       }
  //     }
  //   }
  // }, [defferedInput]);

  return (
    <Container>
      <Title />
      <form>
        <Input
        inputValue={searchValue}
        onChange={handleInputChange}
        placeholderText={"Search for Users"}
      />
      </form>

      <UsersList inputValue={ searchValue} />
      
      {/* {isLoading ? (
        <Loader />
      ) : (
        <div>
            { users && users.length > 0 ? ( <UsersList inputValue={ searchValue} />  */}
            {/* // users.map((user: IUser) => 
            //   const { avatar_url, login, id, repos_url } = user;
            //   return (
            //     <Link key={id} to={`/user/${login}`}>
            //       <UserCard */}
            {/* //         imgUrl={avatar_url}
            //         userName={login}
            //         userRepoUrl={repos_url}
            //       />
            //     </Link> */}
            {/* //   );
            // })
          // ) : (
          //   <p>We don't have such users...</p>
          // )}
      //   </div> */}
      {/* // )} */}
    </Container>
  );
};

export default Home;