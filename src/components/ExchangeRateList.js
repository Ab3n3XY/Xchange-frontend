"use client";

import React, { useEffect, useState } from 'react';
import { fetchExchangeRates } from '../services/api';
import Flag from 'react-flagkit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ExchangeRateTable = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [visibleCurrencies, setVisibleCurrencies] = useState({});

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const response = await fetchExchangeRates(formattedDate);
        setExchangeRates(response.data);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchRates();
  }, [selectedDate]);

  const countryCodes = {
    USD: 'US', EUR: 'EU', GBP: 'GB', CHF: 'CH', SEK: 'SE', NOK: 'NO', DKK: 'DK', DJF: 'DJ', JPY: 'JP', CAD: 'CA',
    SAR: 'SA', AED: 'AE', XAF: 'CF', INR: 'IN', KES: 'KE', AUD: 'AU', SDR: 'XDR', ZAR: 'ZA', CNY: 'CN', KWD: 'KW'
  };

  const formattedDate = selectedDate.toISOString().split('T')[0];

  const getClosestAvailableRates = (rates, date) => {
    const availableDates = [...new Set(rates.map(rate => new Date(rate.date).toISOString().split('T')[0]))];
    const closestDate = availableDates.filter(d => d <= date).sort((a, b) => new Date(b) - new Date(a))[0];
    return rates.filter(rate => new Date(rate.date).toISOString().split('T')[0] === closestDate);
  };

  const filteredRates = getClosestAvailableRates(exchangeRates, formattedDate);

  const groupedRates = filteredRates.reduce((acc, rate) => {
    const bankName = rate.bank.name;
    if (!acc[bankName]) {
      acc[bankName] = [];
    }
    acc[bankName].push(rate);
    return acc;
  }, {});

  const handleViewMore = (bankName) => {
    setVisibleCurrencies(prevState => ({
      ...prevState,
      [bankName]: groupedRates[bankName].length
    }));
  };

  const handleViewLess = (bankName) => {
    setVisibleCurrencies(prevState => ({
      ...prevState,
      [bankName]: 5
    }));
  };

  const orderCurrencies = (rates) => {
    const priorityCurrencies = ['USD', 'GBP', 'EUR', 'CHF', 'CAD', 'AED', 'SAR', 'CNY'];
    return rates.sort((a, b) => {
      if (priorityCurrencies.includes(a.currency) && priorityCurrencies.includes(b.currency)) {
        return priorityCurrencies.indexOf(a.currency) - priorityCurrencies.indexOf(b.currency);
      } else if (priorityCurrencies.includes(a.currency)) {
        return -1;
      } else if (priorityCurrencies.includes(b.currency)) {
        return 1;
      } else {
        return a.currency.localeCompare(b.currency);
      }
    });
  };

  const abbreviateBankName = (name) => {
    const bankAbbreviations = {
        'Commercial Bank of Ethiopia':'CBE',
        'Awash International Bank':'AIB',
        'Bank of Abyssinia':'BOA',
        'Dashen Bank':'DSH',
        'Cooperative Bank of Oromia':'CBO',
        'Hibret Bank':'HBT',
        'Oromia International Bank':'OIB',
        'Nib International Bank':'NIB',
        'Abay Bank':'ABY',
        'Zemen Bank':'ZEM',
        'Berhan International Bank':'BIB',
        'Bunna International Bank':'BII',
        'Global Bank Ethiopia':'GBE',
        'Enat Bank':'ENT',
        'Lion International Bank':'LIB',
        'Wegagen Bank':'WEG',
        'Development Bank of Ethiopia':'DBE',
        'ZamZam Bank':'ZZM',
        'Hijra Bank':'HJR',
        'Siinqee Bank':'SIN',
        'Gadaa Bank':'GDB',
        'Amhara Bank':'AMB',
        'Tsehay Bank':'TSB',
    };
    return bankAbbreviations[name] || name;
  };
  const today = new Date();
  
  return (
    <div className="container mx-auto mt-6 md:mt-10 p-2 md:p-4">
      <div className="flex items-end justify-end mb-4 md:mb-6 z-0">
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          dateFormat="MMMM d, yyyy"
          className="p-2 border border-gray-600 rounded bg-gray-900 text-white"
          calendarClassName="bg-gray-900 text-white"
          maxDate={today}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(groupedRates).length > 0 ? (
          Object.keys(groupedRates).map(bankName => (
            <div key={bankName} className="mb-4 md:mb-6 bg-gray-800 rounded-lg shadow-lg p-2 md:p-4">
              <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-purple-300 flex items-center">
                <img src={`${abbreviateBankName(bankName)}.png`} alt={abbreviateBankName(bankName)} className="mr-2 w-8 h-8" />
                {bankName}
              </h2>
              <div className="overflow-x-auto">
                <table className="table-auto w-full border border-gray-600 rounded-md bg-gray-900 text-gray-300 text-xs md:text-sm">
                  <thead>
                    <tr className="bg-gray-700">
                      <th className="px-2 py-1 text-left">Currency</th>
                      <th className="px-2 py-1 text-right">Buying</th>
                      <th className="px-2 py-1 text-right">Selling</th>
                      <th className="px-2 py-1 text-right">T-Buying</th>
                      <th className="px-2 py-1 text-right">T-Selling</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderCurrencies(groupedRates[bankName])
                      .slice(0, visibleCurrencies[bankName] || 5)
                      .map(rate => (
                      <tr key={rate.id} className="border-b hover:bg-gray-600 transition duration-300">
                        <td className="px-2 py-1 flex items-center">
                          <Flag country={countryCodes[rate.currency]} className="mr-1 md:mr-2" style={{ width: '16px', height: '12px' }} />
                          {rate.currency}
                        </td>
                        <td className="px-2 py-1 text-right text-green-400">
                          {rate.buying_rate}
                        </td>
                        <td className="px-2 py-1 text-right text-red-400">
                          {rate.selling_rate}
                        </td>
                        <td className="px-2 py-1 text-right text-yellow-400">
                          {rate.transactional_buying_rate}
                        </td>
                        <td className="px-2 py-1 text-right text-blue-400">
                          {rate.transactional_selling_rate}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="5" className="text-center py-2">
                        {groupedRates[bankName].length > (visibleCurrencies[bankName] || 5) ? (
                          <button
                            onClick={() => handleViewMore(bankName)}
                            className="text-purple-300 font-bold focus:outline-none hover:text-purple-400"
                          >
                            View More
                          </button>
                        ) : (
                          visibleCurrencies[bankName] > 5 && (
                            <button
                              onClick={() => handleViewLess(bankName)}
                              className="text-purple-300 font-bold focus:outline-none hover:text-purple-400"
                            >
                              View Less
                            </button>
                          )
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-300">No rates available for the selected date.</div>
        )}
      </div>
    </div>
  );
};

export default ExchangeRateTable;
