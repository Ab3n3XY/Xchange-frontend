"use client";

import React, { useEffect, useState, Suspense, lazy } from 'react';
import CurrencyTable from '../components/CurrencyTable';
import { fetchExchangeRates } from '../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function HomePage() {
    const [exchangeRates, setExchangeRates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [visibleBanks, setVisibleBanks] = useState(5);

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
        setVisibleBanks(5);
        fetchRates();
    }, [selectedDate]); // Depend on selectedDate

    const formattedDate = selectedDate.toISOString().split('T')[0];

    const filteredRates = exchangeRates.filter(rate => {
        const rateDate = new Date(rate.date).toISOString().split('T')[0];
        return rateDate <= formattedDate; // Include rates up to and including the selected date
    });

    const currencies = ['USD', 'GBP', 'EUR', 'AED', 'SAR', 'CNY', 'CHF', 'CAD'];
    const today = new Date();
    return (
        <div className="container mx-auto mt-8 md:mt-20 z-1">
            <div className="mb-2 -z-0">
                <div className="flex items-center justify-end space-x-4 bg-none p-4 rounded-lg">
                    <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat="MMMM d, yyyy"
                        className="p-2 border border-gray-600 rounded bg-gray-900 text-white custom-datepicker"
                        maxDate={today}
                        aria-label="Select Date"  // Added aria-label for accessibility
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {currencies.map(currency => {
                    const ratesForCurrency = filteredRates.filter(rate => rate.currency === currency);
                    return (
                        <CurrencyTable key={currency} currency={currency} rates={ratesForCurrency} />
                    );
                })}
            </div>
        </div>
    );
}
