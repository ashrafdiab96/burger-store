import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-store-502c5-default-rtdb.firebaseio.com/'
});

export default instance;