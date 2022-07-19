import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '../constants/constants';

 const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    responseType: 'json',
    headers: {'Authorization': `token ${process.env.REACT_APP_ACCESS_TOKEN}`}
 })

export default axiosInstance;