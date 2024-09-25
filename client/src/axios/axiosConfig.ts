import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://dumky-social-server-production.up.railway.app',
});
