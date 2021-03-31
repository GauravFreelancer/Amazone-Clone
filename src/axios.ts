import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001/challenge-b6081/us-central1/api'
    // http://localhost:5001/challenge-b6081/us-central1/api
    // https://us-central1-challenge-b6081.cloudfunctions.net/api
});

export default instance;