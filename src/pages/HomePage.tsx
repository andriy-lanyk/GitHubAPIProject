import { FC, useState, useContext } from 'react';

import { SearchContext } from '../context/searchContext';
import { SearchContextType } from '../interfaces/contextType';

import Input from '../components/Input';
import UsersList from '../components/UsersList';

const Home: FC = () => {
	const { value } = useContext(SearchContext) as SearchContextType;
	const [searchValue, setSearchValue] = useState<string>(value);

	const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		setSearchValue(e.currentTarget.value);
	};

	return (
		<>
			<form>
				<Input
					inputValue={searchValue}
					onChange={handleInputChange}
					placeholderText={'Search for Users'}
				/>
			</form>

			<UsersList inputValue={searchValue} />
		</>
	);
};

export default Home;
