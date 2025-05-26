import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Personal Finance Tracker',
  description: 'Track your personal finances with ease',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          <header className="bg-primary-600 py-4">
            <div className="container mx-auto px-4">
              <h1 className="text-2xl font-bold text-white">
                Personal Finance Tracker
              </h1>
            </div>
          </header>
          <main className="container mx-auto p-4">
            {children}
          </main>
          <footer className="bg-gray-100 py-4 mt-8">
            <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
              © {new Date().getFullYear()} Personal Finance Tracker
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 