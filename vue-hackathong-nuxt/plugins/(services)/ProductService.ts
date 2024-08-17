import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://icanhazdadjoke.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  get() {
    return apiClient.get('/j/R7UfaahVfFd');
  },
  post(resource: any, data: any) {
    return apiClient.post(resource, data);
  },
};