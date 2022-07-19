import { FC, useState } from "react";

import Input from "../components/Input";
import UsersList from '../components/UsersList';

const Home: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleInputChange = (e: any) => {
    setSearchValue(e.currentTarget.value);
  };

  return (<>
      <form>
        <Input
        inputValue={searchValue}
        onChange={handleInputChange}
        placeholderText={"Search for Users"}
      />
      </form>

      <UsersList inputValue={ searchValue} />
    </>
  );
};

export default Home;