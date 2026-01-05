import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "sonner";
import { Navbar } from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TheBench',
  description: 'TheBench is a decentralized verdict platform where users submit questions and a rotating on-chain jury delivers transparent, unbiased decisions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
              <Toaster />
            </main>
        </div>
      </body>
    </html>
  );
}
