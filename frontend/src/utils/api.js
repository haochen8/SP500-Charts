import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sp500-charts.onrender.com/api',
});

export default api;