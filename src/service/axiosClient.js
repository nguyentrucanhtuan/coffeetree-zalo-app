import axios from 'axios';

const axiosClient = axios.create({

    baseURL: 'http://localhost:81/api',

    headers: {
        'content-type': 'application/json',
    },

});

export default axiosClient;