"use client";

import React, { useState } from 'react';
import Flag from 'react-flagkit';

const CurrencyTable = ({ currency, rates = [] }) => {
  const [sortCriterion, setSortCriterion] = useState('buying'); // 'buying' or 'selling'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  const [visibleBanks, setVisibleBanks] = useState(5);

  const sortedRates = [...rates].sort((a, b) => {
    if (sortCriterion === 'buying') {
      return sortOrder === 'asc' ? a.buying_rate - b.buying_rate : b.buying_rate - a.buying_rate;
    } else {
      return sortOrder === 'asc' ? a.selling_rate - b.selling_rate : b.selling_rate - a.selling_rate;
    }
  });

  const topRates = sortedRates.slice(0, visibleBanks);

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

  const handleSort = (criterion) => {
    if (sortCriterion === criterion) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriterion(criterion);
      setSortOrder('desc');
    }
  };

  const handleViewMore = () => {
    setVisibleBanks(sortedRates.length);
  };

  const handleViewLess = () => {
    setVisibleBanks(5);
  };

  const getArrowIcon = (currentRate, previousRate) => {
    if (currentRate > previousRate) {
      return  <span className="text-red-600 font-bold mr-2">↑</span>;
    } else if (currentRate < previousRate) {
      return <span className="text-green-600 font-bold mr-2">↓</span>;
    } else {
      return <span className="text-gray-400 font-bold mr-2">-</span>;
    }
  };

  return (
    <div className="w-full p-2 md:p-4 md:mx-4 bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
      <div className="flex items-center mb-2 md:mb-4">
        <Flag country={countryCodes[currency]} className="mr-2 md:mr-3" style={{ width: '30px', height: '20px' }} />
        <h2 className="text-lg md:text-2xl font-bold text-purple-300">{currency}</h2>
      </div>
      <table className="table-auto w-full border border-gray-600 rounded-md bg-gray-900 text-gray-300 p-4">
        <thead>
          <tr className="bg-gray-700 text-xs md:text-md">
            <th className="px-1 py-1 md:px-4 md:py-2">Bank</th>
            <th className="px-1 py-1 md:px-4 md:py-2">
              <button onClick={() => handleSort('buying')} className="font-bold text-gray-300 focus:outline-none">
                {sortCriterion === 'buying' ? (
                  sortOrder === 'asc' ? ('↑') : ('↓')) : ('↑')}
              </button> Buying
            </th>
            <th className="px-1 py-1 md:px-4 md:py-2">
              <button onClick={() => handleSort('selling')} className="font-bold text-gray-300 focus:outline-none">
                {sortCriterion === 'selling' ? (
                  sortOrder === 'asc' ? ('↑') : ('↓')) : ('↑')}
              </button> Selling
            </th>
          </tr>
        </thead>
        <tbody>
          {topRates.map(rate => (
            <tr key={rate.id} className="border-b text-xs md:text-md">
              <td className="px-1 py-1 md:px-4 md:py-2">
                {abbreviateBankName(rate.bank.name)}
              </td>
              <td className="px-1 py-1 md:px-4 md:py-2 text-green-400">
                {getArrowIcon(rate.buying_rate, rate.previous_buying_rate)}
                {rate.buying_rate}
              </td>
              <td className="px-1 py-1 md:px-4 md:py-2 text-red-400">
                {getArrowIcon(rate.selling_rate, rate.previous_selling_rate)}
                {rate.selling_rate}
              </td>
            </tr>
          ))}
          {visibleBanks < sortedRates.length && (
            <tr className="border-b text-xs md:text-md">
              <td colSpan="3" className="px-1 py-1 md:px-4 md:py-2 text-center">
                <button 
                  onClick={handleViewMore} 
                  className="text-white font-bold focus:outline-none hover:text-green-400"
                >
                  View More
                </button>
              </td>
            </tr>
          )}
          {visibleBanks === sortedRates.length && (
            <tr className="border-b text-xs md:text-md">
              <td colSpan="3" className="px-1 py-1 md:px-4 md:py-2 text-center">
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
