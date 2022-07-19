import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from './components/Container';
import Title from './components/Title';
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";

const App: FC = () => {
	return (<Container>
		<Title />
					<Routes>
				<Route
					path='/'
					element={<HomePage />}
				/>
				<Route path='/user/:login' element={<UserPage />} />
				<Route
					path='*'
					element={<HomePage />}
				/>
			</Routes>
	</Container>
	);
}

export default App;

