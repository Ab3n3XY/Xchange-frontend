const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white p-4 z-50 opacity-90">
          <div className="text-right">
            <p className="opacity-40 text-sm md:text-base">
              &copy; {new Date().getFullYear()} Ethio X-change | Designed by{' '}
              <a
                href="https://www.abenxy.xyz/"
                className="text-white hover:opacity-50 p-2 border-none text-sm md:text-base"
              >
                Ab3nXY
              </a>
            </p>
          </div>
      </footer>
    );
  };
  
  export default Footer;