import './globals.css';
import Header from './Header';
import Footer from './Footer';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="min-h-screen flex flex-col font-sans bg-black">
                    <Header className="z-100" /> {/* Increased z-index */}
                    <div className="mt-10 flex-grow">
                        {children}
                    </div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
