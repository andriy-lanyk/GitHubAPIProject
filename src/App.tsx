import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchProvider from './context/searchContext';
import Container from './components/Container';
import Title from './components/Title';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App: FC = () => {
	return (
		<SearchProvider>
			<Container>
				<Title />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/user/:login' element={<UserPage />} />
					<Route path='*' element={<HomePage />} />
				</Routes>

				<ToastContainer
					position='top-right'
					autoClose={4000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</Container>
		</SearchProvider>
	);
};

export default App;
