import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flag from 'react-flagkit';

const CurrencyTable = ({ currency, rates = [] }) => {
  // Ensure rates is an array and sort by buying rate in descending order
  const sortedRates = Array.isArray(rates) ? [...rates].sort((a, b) => b.buying_rate - a.buying_rate) : [];

  const abbreviateBankName = (name) => {
    // Map full bank names to abbreviations
    const bankAbbreviations = {
      'Commercial Bank of Ethiopia': 'CBE',
      'Bank of Abyssinia': 'BOA',
      'Dashen Bank': 'DB',
      // Add other bank name mappings here
    };
    return bankAbbreviations[name] || name; // Return abbreviation or full name if not found
  };

  return (
    <div className="w-full p-4 mx-2 bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <Flag country={countryCodes[currency]} className="mr-3" style={{ width: '40px', height: '30px' }} />
        <h2 className="text-2xl font-bold text-purple-300">{currency}</h2>
      </div>
      <table className="table-auto w-full border border-gray-600 rounded-md bg-gray-900 text-gray-300">
        <thead>
          <tr className="bg-gray-700">
            <th className="px-4 py-2">Bank</th>
            <th className="px-4 py-2">Buying</th>
            <th className="px-4 py-2">Selling</th>
          </tr>
        </thead>
        <tbody>
          {sortedRates.map(rate => (
            <tr key={rate.id} className="border-b ">
              <td className="px-4 py-2">
                {abbreviateBankName(rate.bank.name)}
              </td>
              <td className="px-4 py-2 text-green-400">
                <FontAwesomeIcon icon="dollar-sign" className="mr-2" />
                {rate.buying_rate}
              </td>
              <td className="px-4 py-2 text-red-400">
                <FontAwesomeIcon icon="dollar-sign" className="mr-2" />
                {rate.selling_rate}
              </td>
            </tr>
          ))}
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
