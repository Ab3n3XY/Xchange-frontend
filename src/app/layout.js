import './globals.css';
import Header from './Header';
import Footer from './Footer';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
            <div className={`min-h-screen flex flex-col font-sans`}>
            <Header />
            <div className="mt-10">
               {children} 
            </div>
            <Footer />
            </div>
            </body>
        </html>
    );
}
