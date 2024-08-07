"use client";

import './globals.css';
import Header from './Header';
import Footer from './Footer';
import { HelmetProvider } from 'react-helmet-async';

export default function RootLayout({ children }) {
    return (
        <HelmetProvider>
        <html lang="en">
            <head>
                <title>EthioForeX</title>
                <meta name="description" content="Update exchange rates for Ethiopian banks. Mobile-friendly, responsive interface with clear indicators for updated banks." />
            </head>
            <body>
                <div className="min-h-screen flex flex-col font-sans bg-black">
                    <Header className="z-100" /> 
                    <div className="mt-10 flex-grow">
                        {children}
                    </div>
                    <Footer />
                </div>
                
            </body>
        </html>
        </HelmetProvider>
    );
}
