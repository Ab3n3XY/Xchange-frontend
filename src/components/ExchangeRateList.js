"use client";

import React, { useEffect, useState } from 'react';
import { fetchExchangeRates } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flag from 'react-flagkit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ExchangeRateTable = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchExchangeRates().then(response => {
      setExchangeRates(response.data);
    }).catch(error => {
      console.error('Error fetching exchange rates:', error);
    });
  }, []);

  const countryCodes = {
    USD: 'US', EUR: 'EU', GBP: 'GB', CHF: 'CH', SEK: 'SE', NOK: 'NO', DKK: 'DK', DJF: 'DJ', JPY: 'JP', CAD: 'CA',
    SAR: 'SA', AED: 'AE', XAF: 'CF', INR: 'IN', KES: 'KE', AUD: 'AU', SDR: 'XDR', ZAR: 'ZA', CNY: 'CN', KWD: 'KW'
  };

  const formattedDate = selectedDate.toISOString().split('T')[0];
  
  const filteredRates = exchangeRates.filter(rate => {
    const rateDate = new Date(rate.date).toISOString().split('T')[0];
    return rateDate === formattedDate;
  });

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="flex items-end justify-end mb-6">
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          dateFormat="MMMM d, yyyy"
          className="p-2 border border-gray-600 rounded bg-gray-900 text-white"
          calendarClassName="bg-gray-900 text-white"
        />
      </div>
      {Object.keys(filteredRates.reduce((acc, rate) => {
        const bankName = rate.bank.name;
        if (!acc[bankName]) {
          acc[bankName] = [];
        }
        acc[bankName].push(rate);
        return acc;
      }, {})).map(bankName => (
        <div key={bankName} className="mb-6 bg-gray-800 rounded-lg shadow-lg p-4">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">{bankName}</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-600 rounded-md bg-gray-900 text-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-2 py-1 text-left">Currency</th>
                  <th className="px-2 py-1 text-right">Cash Buying</th>
                  <th className="px-2 py-1 text-right">Cash Selling</th>
                  <th className="px-2 py-1 text-right">Transactional Buying</th>
                  <th className="px-2 py-1 text-right">Transactional Selling</th>
                </tr>
              </thead>
              <tbody>
                {filteredRates.filter(rate => rate.bank.name === bankName).map(rate => (
                  <tr key={rate.id} className="border-b hover:bg-gray-600 transition duration-300">
                    <td className="px-2 py-1 flex items-center">
                      <Flag country={countryCodes[rate.currency]} className="mr-2" style={{ width: '24px', height: '16px' }} />
                      {rate.currency}
                    </td>
                    <td className="px-2 py-1 text-right text-green-400">
                      <FontAwesomeIcon icon="dollar-sign" className="mr-1" />
                      {rate.buying_rate}
                    </td>
                    <td className="px-2 py-1 text-right text-red-400">
                      <FontAwesomeIcon icon="dollar-sign" className="mr-1" />
                      {rate.selling_rate}
                    </td>
                    <td className="px-2 py-1 text-right text-yellow-400">
                      <FontAwesomeIcon icon="dollar-sign" className="mr-1" />
                      {rate.transactional_buying_rate}
                    </td>
                    <td className="px-2 py-1 text-right text-blue-400">
                      <FontAwesomeIcon icon="dollar-sign" className="mr-1" />
                      {rate.transactional_selling_rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExchangeRateTable;
