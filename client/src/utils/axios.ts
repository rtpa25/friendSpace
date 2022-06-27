import axios from 'axios';
import Session from 'supertokens-auth-react/recipe/session';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});
Session.addAxiosInterceptors(axiosInstance);
