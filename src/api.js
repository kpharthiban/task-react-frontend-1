import axios from 'axios';

// Importing axios and enabling connection to the URL/location
const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export default api;