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
            <img src="logo.jpeg" alt="Logo" className="h-24 w-24 rounded-full" />
            <div className="text-start ml-4">
              <span className="font-bold text-3xl text-fourth block letter-spacing-wider">Ethio X-change</span>
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
        <div className={`rounded-full text-md font-semibold space-y-2 md:space-x-3 ${menuOpen ? 'block bg-primary' : 'hidden md:block bg-secondary'}`}>
          {navLinks.map(({ path, label }) => (
            <Link key={path} href={path}>
              <span
                className={`nav-link block md:inline-block px-2 py-2 md:px-4 md:py-2 hover:opacity-70 ${activeLink === path ? 'active-nav-link' : ''} text-sm md:text-lg`}
                onClick={() => {handleSetActiveLink(path); setMenuOpen(false);}}
              >
                {label}
              </span>
            </Link>
          ))}
          {/* Contact Us button */}
          <button
            onClick={() => {setShowContact(true); setMenuOpen(false);}}
            className="nav-link text-gray-300 px-2 py-2 text-sm md:text-lg hover:opacity-70"
          >
            Contact Us
          </button>
        </div>
      </nav>
      {/* Contact popup */}
      {showContact && <Contact closePopup={() => setShowContact(false)} />}
    </header>
  );
};

export default Header;