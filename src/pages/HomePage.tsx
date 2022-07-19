import { FC, useState, useEffect } from 'react';

import Input from '../components/Input';
import UsersList from '../components/UsersList';

const Home: FC = () => {
	const [searchValue, setSearchValue] = useState<string>('');

	const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		setSearchValue(e.currentTarget.value);
	};

	useEffect(() => {
		const storage = localStorage.getItem('filterGitHubUsers');
		if (storage && typeof storage === 'string') {
			setSearchValue(JSON.parse(storage));
		}
	}, []);

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
