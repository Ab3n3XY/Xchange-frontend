const Footer = () => {
    return (
      <footer className="text-gray-400 bg-gray-900 p-4 z-50 ">
          <div className="text-right">
            <p className=" text-sm md:text-base">
              &copy; {new Date().getFullYear()} EthioForex | Created by{' '}
              <a
                href="https://www.abenxy.xyz/"
                className="font-semibold hover:text-white border-none text-sm md:text-base pr-4"
              >
                Ab3nXY
              </a>
            </p>
          </div>
      </footer>
    );
  };
  
  export default Footer;