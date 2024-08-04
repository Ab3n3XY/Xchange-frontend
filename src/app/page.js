"use client";

import React, { useEffect, useState } from 'react';
import CurrencyTable from '../components/CurrencyTable';
import ExchangeRateList from '../components/ExchangeRateList';
import { fetchExchangeRates } from '../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function HomePage() {
    const [exchangeRates, setExchangeRates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

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
    }, [selectedDate]); // Depend on selectedDate

    const formattedDate = selectedDate.toISOString().split('T')[0];

    const filteredRates = exchangeRates.filter(rate => {
        const rateDate = new Date(rate.date).toISOString().split('T')[0];
        return rateDate <= formattedDate; // Include rates up to and including the selected date
    });

    const currencies = ['USD', 'GBP', 'EUR', 'AED', 'SAR', 'CNY', 'CHF', 'CAD'];

    return (
        <div className="container mx-auto mt-8 md:mt-20">
            <div className="mb-2 -z-0">
                <div className="flex items-center justify-end space-x-4 bg-none p-4 rounded-lg">
                    <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat="MMMM d, yyyy"
                        className="p-2 border border-gray-600 rounded bg-gray-900 text-white"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {currencies.map(currency => {
                    const ratesForCurrency = filteredRates.filter(rate => rate.currency === currency);
                    return (
                        <CurrencyTable key={currency} currency={currency} rates={ratesForCurrency} selectedDate={selectedDate} />
                    );
                })}
            </div>
            <ExchangeRateList />
        </div>
    );
}
