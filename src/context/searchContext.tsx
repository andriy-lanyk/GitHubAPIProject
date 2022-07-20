import { FC, createContext, useState } from 'react';
import { SearchContextType } from '../interfaces/contextType';

export const SearchContext = createContext<SearchContextType | null>(null);

interface ISearch {
	children: JSX.Element | React.ReactNode;
}

const SearchProvider: FC<ISearch> = ({ children }) => {
	const [searchMode, setSearchMode] = useState<string>('');
	return (
		<SearchContext.Provider
			value={{ value: searchMode, changeValue: setSearchMode }}
		>
			{children}
		</SearchContext.Provider>
	);
};

export default SearchProvider;
