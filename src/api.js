import axios from 'axios';

// Importing axios and enabling connection to the URL/location
const api = axios.create({
    baseURL: "https://test-fastapi-backend-g16q.onrender.com", // Change this with http://localhost:8000 - for local testing
});

export default api;