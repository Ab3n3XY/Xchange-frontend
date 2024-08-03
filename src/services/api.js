import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';
// const API_BASE_URL = 'https://ab3nx.pythonanywhere.com/api';

export const fetchBanks = () => axios.get(`${API_BASE_URL}/banks/`);
export const fetchExchangeRates = (date) => axios.get(`${API_BASE_URL}/exchange-rates/`, { params: { date } });

