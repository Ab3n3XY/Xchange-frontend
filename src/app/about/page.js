"use client";

import React, { useState } from 'react'; 
import { Helmet} from 'react-helmet-async';

const aboutUsData = {
    title: 'EthioForeX | About Us',
    description: 'Discover real-time exchange rates with EthioForeX. Our platform provides up-to-date information on USD exchange rates across top Ethiopian banks, featuring an intuitive interface and customizable date ranges to suit your needs.'
  };
  
  export default function AboutUs() {
  
    return (
      <main className="mt-12 font-sans p-4 sm:p-10 bg-black">
        <Helmet>
          <title>{aboutUsData.title}</title>
          <meta name="description" content={aboutUsData.description} />
        </Helmet>
      <h1 className="text-3xl sm:text-2xl font-bold text-primary text-center">About Us</h1>
      <div className="max-w-5xl mx-auto ">
        <section className="px-20 items-center">
            <p className="mt-4 text-lg sm:text-md text-black-700">
            At EthioForeX, we are a passionate team of web developers committed to enhancing financial transparency and understanding within Ethiopia. Our mission is to provide real-time exchange rate data from leading Ethiopian banks, helping individuals and businesses stay informed about currency fluctuations. We believe that accessible, accurate data is crucial for making well-informed decisions, whether you're managing personal finances or running a business.
            We also recognize the value of our platform for economists and policymakers who rely on current economic data to analyze trends and suggest effective policies. By offering up-to-date exchange rate information, we aim to contribute to a more informed and strategic approach to economic planning in Ethiopia. Our goal is to empower users with the tools they need to navigate the financial landscape and drive positive change in our country's economy.
            </p>
        </section>
      </div>
    </main>
  );
}