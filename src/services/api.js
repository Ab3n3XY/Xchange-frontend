import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Replace with your Django backend URL

export const fetchBanks = () => axios.get(`${API_BASE_URL}/banks/`);
export const fetchExchangeRates = () => axios.get(`${API_BASE_URL}/exchange-rates/`);
