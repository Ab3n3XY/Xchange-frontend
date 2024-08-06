"use client";

import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const aboutUsData = {
  title: "EthioForeX | About Us",
  description: "Discover real-time exchange rates with EthioForeX. Our platform provides up-to-date information on USD exchange rates across top Ethiopian banks, featuring an intuitive interface and customizable date ranges to suit your needs."
};

export default function AboutUs() {
  return (
    <main className="flex flex-col bg-gray-700 mt-4 md:mt-14 p-4 md:p-20 -z-1">
      <Helmet>
        <title>{aboutUsData.title}</title>
        <meta name="description" content={aboutUsData.description} />
      </Helmet>
      <h1 className="text-3xl sm:text-4xl font-bold text-primary text-center">About Us</h1>
      <div className="flex-grow px-4 sm:px-8">
        <p className="mt-8 text-md sm:text-lg text-gray-300">
          At EthioForeX, we are dedicated to bridging the gap between individuals and businesses and the complex world of finance. By providing real-time, accurate, and comprehensive exchange rate data from Ethiopia&apos;s leading banks, we empower our users to make informed financial decisions with confidence.

          Our platform serves as a vital resource for a diverse audience. From everyday citizens managing personal finances to entrepreneurs navigating the complexities of international trade, EthioForeX offers the essential data needed to thrive in today&apos;s dynamic economic landscape. Economists and policymakers can leverage our platform to gain valuable insights into currency fluctuations, enabling them to develop data-driven strategies for economic growth and stability.

          We believe that financial literacy is key to economic empowerment. Through our user-friendly platform and commitment to data accuracy, we strive to foster a more financially literate society. EthioForeX is more than just an exchange rate platform; it&apos;s a tool for economic progress, contributing to a stronger and more prosperous Ethiopia.

          By choosing EthioForeX, you&apos;re not just accessing data; you&apos;re investing in a better financial future for yourself and your community.

          Join us in our mission to build a financially empowered Ethiopia.
        </p>
      </div>
    </main>
  );
}
