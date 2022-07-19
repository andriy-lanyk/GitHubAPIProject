import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";

const App: FC = () => {
	return (
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
	);
}

export default App;

