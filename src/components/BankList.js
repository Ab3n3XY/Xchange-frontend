'use client'; // Required for Client Component in Next.js 14

import React, { useEffect, useState } from 'react';
import { fetchBanks } from '../services/api';

const BankList = () => {
    const [banks, setBanks] = useState([]);

    useEffect(() => {
        fetchBanks().then(response => {
            setBanks(response.data);
        }).catch(error => {
            console.error('Error fetching banks:', error);
        });
    }, []);

    return (
        <div>
            <h1>Banks</h1>
            <ul>
                {banks.map(bank => (
                    <li key={bank.id}>
                        <h2>{bank.name}</h2>
                        <p>Address: {bank.address}</p>
                        <p>Contact: {bank.contact_number}</p>
                        <a href={bank.website} target="_blank" rel="noopener noreferrer">Website</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BankList;
