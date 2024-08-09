"use client";

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { fetchExchangeRates2 } from '../../services/api'; // Ensure this import is correct
import Flag from 'react-flagkit';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const ExchangeRatesGraph = ({ currency, startDate, today, specifiedBanks }) => {
  const [rates, setRates] = useState([]);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const data = await fetchExchangeRates2(currency, startDate, today, specifiedBanks);
        setRates(data); // Set the fetched data to state
      } catch (error) {
        console.error(`Error fetching ${currency} exchange rates:`, error);
      }
    };
    
    fetchExchangeRates();
  }, [currency, startDate, today]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Helper function to generate an array of dates between two dates
  const generateDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dates = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const chartData = {
    labels: generateDateRange(startDate, today).map(date => new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })),
    datasets: specifiedBanks.map(bank => {
      const bankData = rates.filter(rate => rate.bank.name === bank);
      let borderColor;

      switch (bank) {
        case 'Commercial Bank of Ethiopia':
          borderColor = 'purple';
          break;
        case 'Bank of Abyssinia':
          borderColor = 'yellow';
          break;
        case 'Awash International Bank':
          borderColor = 'skyblue';
          break;
        case 'Gadaa Bank':
          borderColor = 'red';
          break;
        case 'Dashen Bank':
          borderColor = 'blue';
          break;
        case 'Ethioblackmarket':
          borderColor = 'black';
          break;
        default:
          borderColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      }

      // Fill in missing data points with the last available data
      let lastRate = null;
      const data = generateDateRange(startDate, today).map(date => {
        const rate = bankData.find(r => r.date === date);
        if (rate) {
          lastRate = rate.selling_rate;
          return rate.selling_rate;
        } else {
          return lastRate;
        }
      });

      return {
        label: bank,
        data: data,
        borderColor: borderColor,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        fill: false,
        spanGaps: true,
        borderWidth: isMobile ? 1 : 2, // Thinner lines for mobile
        lineTension: isMobile ? 0.1 : 0.3, // Smoother lines for desktop
        pointRadius: isMobile ? 1 : 2, // Adjust size for mobile
        pointBackgroundColor: borderColor,
      };
    })
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to expand fully on mobile
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: isMobile ? 8 : 12, // Smaller font size for mobile
            family: 'Arial, sans-serif', // Font family
            weight: 'bold', // Font weight
          },
          boxWidth: isMobile ? 5 : 10, // Width of the legend box
          boxHeight: isMobile ? 5 : 10, // Height of the legend box
          boxBorderColor: 'rgba(255, 255, 255, 0.8)', // Border color of the legend box
          boxBorderWidth: 2, // Border width of the legend box
          generateLabels: (chart) => {
            const defaultLabels = ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
  
            return defaultLabels.map(label => {
              const bankNameMap = {
                'Commercial Bank of Ethiopia': 'CBE',
                'Bank of Abyssinia': 'BOA',
                'Awash International Bank': 'AIB',
                'Gadaa Bank': 'GDB',
                'Dashen Bank': 'DSH',
              };
  
              label.text = bankNameMap[label.text] || label.text;
              return label;
            });
          },
        }
      },
      tooltip: {
        callbacks: {
          labelTextColor: () => '#ffffff'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: isMobile ? 6 : 10, // Adjust size for mobile
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      y: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: isMobile ? 6 : 10, // Adjust size for mobile
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)'
        },
        position: 'right'
      }
    }
  };
  

  return (
<div className="w-full p-4 md:p-6 bg-gray-800 rounded-lg shadow-lg mt-8">
  <h2 className="text-lg md:text-2xl font-bold text-teal-400 mb-4 flex items-center">
    <Flag
      country={countryCodes[currency]}
      className="mr-2 w-6 h-4 sm:w-8 sm:h-6 md:w-10 md:h-8"
    />
    Exchange Rates
  </h2>
  <div className="w-full h-60 md:h-80">
    <Line data={chartData} options={chartOptions} />
  </div>
</div>

  );
};

const TopExchangeRatesGraph = () => {
  const today = new Date().toISOString().split('T')[0];
  const startDate = '2024-07-26';

  const specifiedBanks = [
    'Commercial Bank of Ethiopia',
    'Awash International Bank',
    'Gadaa Bank',
    'Bank of Abyssinia',
    'Dashen Bank',
  ];

  return (

<div className="flex flex-col md:flex-row flex-wrap justify-center mt-5">
<div className="w-full md:w-1/2 p-6">
  {/* TopUSDExchangeRatesGraph for USD */}
  <ExchangeRatesGraph currency="USD" startDate={startDate} today={today} specifiedBanks={specifiedBanks} />
</div>
<div className="w-full md:w-1/2 p-6">
  {/* TopUSDExchangeRatesGraph for EUR */}
  <ExchangeRatesGraph currency="EUR" startDate={startDate} today={today} specifiedBanks={specifiedBanks} />
</div>
<div className="w-full md:w-1/2 p-6">
  {/* TopUSDExchangeRatesGraph for GBP */}
  <ExchangeRatesGraph currency="GBP" startDate={startDate} today={today} specifiedBanks={specifiedBanks} />
</div>
<div className="w-full md:w-1/2 p-6">
  {/* TopUSDExchangeRatesGraph for AED */}
  <ExchangeRatesGraph currency="AED" startDate={startDate} today={today} specifiedBanks={specifiedBanks} />
</div>
</div>

  );
};

const countryCodes = {
  USD: 'US', EUR: 'EU', GBP: 'GB', CHF: 'CH', SEK: 'SE', NOK: 'NO', DKK: 'DK', DJF: 'DJ', JPY: 'JP', CAD: 'CA',
  SAR: 'SA', AED: 'AE', XAF: 'CF', INR: 'IN', KES: 'KE', AUD: 'AU', SDR: 'XDR', ZAR: 'ZA', CNY: 'CN', KWD: 'KW'
};

export default TopExchangeRatesGraph;
