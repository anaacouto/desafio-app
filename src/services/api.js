import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.117:8080/api/',
    validateStatus: function (status) {
        return status == 200;
    }
});

export default api;