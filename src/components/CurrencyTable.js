"use client";

import React, { useState, useEffect } from 'react';
import Flag from 'react-flagkit';

const CurrencyTable = ({ currency, rates = [] }) => {
  const [sortCriterion, setSortCriterion] = useState('buying'); // 'buying' or 'selling'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  const [visibleBanks, setVisibleBanks] = useState(5);
  const [displayedRates, setDisplayedRates] = useState([]);

  useEffect(() => {
    const sortedRates = sortRates(rates);
    setDisplayedRates(sortedRates.slice(0, visibleBanks));
  }, [rates, sortCriterion, sortOrder, visibleBanks]);

  const sortRates = (ratesToSort) => {
    return [...ratesToSort].sort((a, b) => {
      const spreadA = ((a.selling_rate - a.buying_rate) / a.buying_rate) * 100;
      const spreadB = ((b.selling_rate - b.buying_rate) / b.buying_rate) * 100;

      if (sortCriterion === 'buying') {
        return sortOrder === 'asc' ? a.buying_rate - b.buying_rate : b.buying_rate - a.buying_rate;
      } else if (sortCriterion === 'selling') {
        return sortOrder === 'asc' ? a.selling_rate - b.selling_rate : b.selling_rate - a.selling_rate;
      } else { // sortCriterion === 'spread'
        return sortOrder === 'asc' ? spreadA - spreadB : spreadB - spreadA;
      }
    });
  };

  const handleSort = (criterion) => {
    if (sortCriterion === criterion) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriterion(criterion);
      setSortOrder('desc');
    }
  };

  const handleViewMore = () => {
    setDisplayedRates(sortRates(rates).slice(0, rates.length));
    setVisibleBanks(rates.length);
  };

  const handleViewLess = () => {
    setDisplayedRates(sortRates(rates).slice(0, 5));
    setVisibleBanks(5);
  };

  const abbreviateBankName = (name) => {
    const bankAbbreviations = {
      'Commercial Bank of Ethiopia': 'CBE',
      'Awash International Bank': 'AIB',
      'Bank of Abyssinia': 'BOA',
      'Dashen Bank': 'DSH',
      'Cooperative Bank of Oromia': 'CBO',
      'Hibret Bank': 'HBT',
      'Oromia International Bank': 'OIB',
      'Nib International Bank': 'NIB',
      'Abay Bank': 'ABY',
      'Zemen Bank': 'ZEM',
      'Berhan International Bank': 'BIB',
      'Bunna International Bank': 'BII',
      'Global Bank Ethiopia': 'GBE',
      'Enat Bank': 'ENT',
      'Lion International Bank': 'LIB',
      'Wegagen Bank': 'WEG',
      'Development Bank of Ethiopia': 'DBE',
      'ZamZam Bank': 'ZZM',
      'Hijra Bank': 'HJR',
      'Siinqee Bank': 'SIN',
      'Gadaa Bank': 'GDB',
      'Amhara Bank': 'AMB',
      'Tsehay Bank': 'TSB',
    };
    return bankAbbreviations[name] || name;
  };

  return (
    <div className="w-full p-2 md:p-4 md:mx-4 bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
      <div className="flex items-center mb-2 md:mb-4">
        <Flag country={countryCodes[currency]} className="mr-2 md:mr-3" style={{ width: '30px', height: '20px' }} />
        <h2 className="text-lg md:text-2xl font-bold text-purple-300">{currency}</h2>
      </div>
      <table className="table-auto w-full border border-gray-600 rounded-md bg-gray-900 text-gray-300 p-2">
        <thead>
          <tr className="bg-gray-700 text-xs md:text-md">
            <th className="px-1 py-1 md:px-1 md:py-2">Bank</th>
            <th className="px-1 py-1 md:px-1 md:py-2">
              <button onClick={() => handleSort('buying')} className="font-bold text-gray-300 focus:outline-none">
                {sortCriterion === 'buying' ? (
                  sortOrder === 'asc' ? ('↑') : ('↓')) : ('↑')}
              </button> Buying
            </th>
            <th className="px-1 py-1 md:px-1 md:py-2">
              <button onClick={() => handleSort('selling')} className="font-bold text-gray-300 focus:outline-none">
                {sortCriterion === 'selling' ? (
                  sortOrder === 'asc' ? ('↑') : ('↓')) : ('↑')}
              </button> Selling
            </th>
            <th className="px-1 py-1 md:px-2 md:py-2 text-center">
              <button onClick={() => handleSort('spread')} className="font-bold text-gray-300 focus:outline-none">
                {sortCriterion === 'spread' ? (
                  sortOrder === 'asc' ? ('↑') : ('↓')) : ('↑')}
              </button> Spread (%)
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedRates.map(rate => {
            const spread = ((rate.selling_rate - rate.buying_rate) / rate.buying_rate) * 100;
            return (
              <tr key={rate.id} className="border-b text-xs md:text-md">
                <td className="px-1 py-1 md:px-4 md:py-2">
                  {abbreviateBankName(rate.bank.name)}
                </td>
                <td className="px-1 py-1 md:px-2 md:py-2 text-green-400">
                  {rate.buying_rate}
                </td>
                <td className="px-1 py-1 md:px-2 md:py-2 text-red-400">
                  {rate.selling_rate}
                </td>
                <td className="px-1 py-1 md:px-2 md:py-2 text-yellow-400 text-center">
                  {spread.toFixed(1)}%
                </td>
              </tr>
            );
          })}
          {visibleBanks < rates.length && (
            <tr className="border-b text-xs md:text-md">
              <td colSpan="4" className="px-1 py-1 md:px-4 md:py-2 text-center">
                <button 
                  onClick={handleViewMore} 
                  className="text-white font-bold focus:outline-none hover:text-green-400"
                >
                  View More
                </button>
              </td>
            </tr>
          )}
          {visibleBanks === rates.length && (
            <tr className="border-b text-xs md:text-md">
              <td colSpan="4" className="px-1 py-1 md:px-4 md:py-2 text-center">
                <button 
                  onClick={handleViewLess} 
                  className="text-white font-bold focus:outline-none hover:text-green-400"
                >
                  View Less
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const countryCodes = {
  USD: 'US', EUR: 'EU', GBP: 'GB', CHF: 'CH', SEK: 'SE', NOK: 'NO', DKK: 'DK', DJF: 'DJ', JPY: 'JP', CAD: 'CA',
  SAR: 'SA', AED: 'AE', XAF: 'CF', INR: 'IN', KES: 'KE', AUD: 'AU', SDR: 'XDR', ZAR: 'ZA', CNY: 'CN', KWD: 'KW'
};

export default CurrencyTable;
