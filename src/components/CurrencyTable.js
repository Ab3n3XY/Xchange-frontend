import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flag from 'react-flagkit';

const CurrencyTable = ({ currency, rates = [] }) => {
  const sortedRates = Array.isArray(rates) ? [...rates].sort((a, b) => b.buying_rate - a.buying_rate) : [];

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
    };
    return bankAbbreviations[name] || name;
  };

  return (
    <div className="w-full p-2 md:p-4 mx-2 bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
      <div className="flex items-center mb-2 md:mb-4">
        <Flag country={countryCodes[currency]} className="mr-2 md:mr-3" style={{ width: '30px', height: '20px' }} />
        <h2 className="text-lg md:text-2xl font-bold text-purple-300">{currency}</h2>
      </div>
      <table className="table-auto w-full border border-gray-600 rounded-md bg-gray-900 text-gray-300">
        <thead>
          <tr className="bg-gray-700 text-xs md:text-base">
            <th className="px-1 py-1 md:px-4 md:py-2">Bank</th>
            <th className="px-1 py-1 md:px-4 md:py-2">Buying</th>
            <th className="px-1 py-1 md:px-4 md:py-2">Selling</th>
          </tr>
        </thead>
        <tbody>
          {sortedRates.map(rate => (
            <tr key={rate.id} className="border-b text-xs md:text-base">
              <td className="px-1 py-1 md:px-4 md:py-2">
                {abbreviateBankName(rate.bank.name)}
              </td>
              <td className="px-1 py-1 md:px-4 md:py-2 text-green-400">
                <FontAwesomeIcon icon="dollar-sign" className="mr-1 md:mr-2" />
                {rate.buying_rate}
              </td>
              <td className="px-1 py-1 md:px-4 md:py-2 text-red-400">
                <FontAwesomeIcon icon="dollar-sign" className="mr-1 md:mr-2" />
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
