"use client";

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { fetchExchangeRates2 } from '../../services/api'; // Ensure this import is correct

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const ExchangeRatesGraph = ({ currency, startDate, today, specifiedBanks }) => {
  const [rates, setRates] = useState([]);

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
        borderWidth: 2, // Set line thickness
        lineTension: 0.3, // Make lines smoother
      };
    })
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          generateLabels: (chart) => {
            const defaultLabels = ChartJS.defaults.plugins.legend.labels.generateLabels(chart);

            // Map through default labels and modify them
            return defaultLabels.map(label => {
              const bankNameMap = {
                'Commercial Bank of Ethiopia': 'CBE',
                'Bank of Abyssinia': 'BOA',
                'Awash International Bank': 'AIB',
                'Gadaa Bank': 'GDB',
                'Dashen Bank': 'DSH'
              };

              // Update label text with short names
              label.text = bankNameMap[label.text] || label.text;
              return label;
            });
          },
          font: {
            size: 12
          }
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
          color: 'rgba(255, 255, 255, 0.8)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      y: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)'
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
      <h2 className="text-lg md:text-2xl font-bold text-teal-400 mb-4">{currency} Exchange Rates</h2>
      <Line data={chartData} options={chartOptions} />
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
    'Dashen Bank'
  ];

  return (

<div className="flex flex-col md:flex-row flex-wrap justify-center mt-5">
<div className="w-full md:w-1/2 p-4">
  {/* TopUSDExchangeRatesGraph for USD */}
  <ExchangeRatesGraph currency="USD" startDate={startDate} today={today} specifiedBanks={specifiedBanks} />
</div>
<div className="w-full md:w-1/2 p-4">
  {/* TopUSDExchangeRatesGraph for EUR */}
  <ExchangeRatesGraph currency="EUR" startDate={startDate} today={today} specifiedBanks={specifiedBanks} />
</div>
<div className="w-full md:w-1/2 p-4">
  {/* TopUSDExchangeRatesGraph for GBP */}
  <ExchangeRatesGraph currency="GBP" startDate={startDate} today={today} specifiedBanks={specifiedBanks} />
</div>
<div className="w-full md:w-1/2 p-4">
  {/* TopUSDExchangeRatesGraph for GBP */}
  <ExchangeRatesGraph currency="AED" startDate={startDate} today={today} specifiedBanks={specifiedBanks} />
</div>
</div>

  );
};

export default TopExchangeRatesGraph;
