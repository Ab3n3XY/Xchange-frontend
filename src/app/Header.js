"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Contact from './Contact';

const Header = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState(router.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (showContact) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showContact]);

  const handleSetActiveLink = (path) => {
    setActiveLink(path);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navLinks = [
    { path: '/about', label: 'About Us' },
  ];

  return (
    <header className="bg-gray-900 text-gray-300 p-2 font-sans fixed w-full top-0 z-1000 opacity-90">
      <nav className="container mx-auto flex justify-between items-center flex-wrap">
        <Link href="/">
          <div className="flex items-center cursor-pointer hover:opacity-80">
            <img src="logo.png" alt="Logo" className="h-12 w-14 md:h-20 md:w-24 rounded-full opacity-80" />
            <div className="text-start ml-4">
              <span className="font-bold text-xl md:text-3xl text-fourth block letter-spacing-wider">EthioForex</span>
            </div>
          </div>
        </Link>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-300 focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
        <div className={`w-full font-bold md:flex md:items-center md:w-auto ${menuOpen ? 'block' : 'hidden'}`}>
          <div className="bg-primary md:bg-transparent md:flex md:space-x-4 rounded-lg p-4 md:p-0">
            {navLinks.map(({ path, label }) => (
              <Link key={path} href={path}>
                <span
                  className={`block px-4 py-2 rounded-md md:inline-block md:px-0 md:py-0 hover:bg-secondary hover:text-white ${activeLink === path ? 'bg-secondary text-white' : ''}`}
                  onClick={() => handleSetActiveLink(path)}
                >
                  {label}
                </span>
              </Link>
            ))}
            <button
              onClick={() => { setShowContact(true); setMenuOpen(false); }}
              className="block px-4 py-2 rounded-md md:inline-block md:px-0 md:py-0 hover:bg-secondary hover:text-white"
            >
              Contact Us
            </button>
          </div>
        </div>
      </nav>
      {showContact && <Contact closePopup={() => setShowContact(false)} />}
    </header>
  );
};

export default Header;
