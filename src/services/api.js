import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';
// const API_BASE_URL = 'https://ab3nx.pythonanywhere.com/api';

export const fetchBanks = () => axios.get(`${API_BASE_URL}/banks/`);
export const fetchExchangeRates = (date) => axios.get(`${API_BASE_URL}/exchange-rates/`, { params: { date } });

export const fetchExchangeRates2 = async (currency, startDate, endDate, banks) => {
  try {
    if (!currency || !startDate || !endDate || !banks || banks.length === 0) {
      throw new Error("Currency, start date, end date, and banks parameters are required.");
    }

    // Construct URL with encoded banks parameter
    const url = `${API_BASE_URL}/chart`;
    const params = {
      currency,
      start_date: startDate,
      end_date: endDate,
      banks: banks.join(',')
    };

    // Fetch data
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};
