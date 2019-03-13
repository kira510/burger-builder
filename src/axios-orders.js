import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-510.firebaseio.com/'
});

export default instance;