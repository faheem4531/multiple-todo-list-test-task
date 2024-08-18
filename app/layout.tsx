import type { Metadata } from 'next';

import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { Inter } from 'next/font/google';

import { Providers } from '@/lib/providers';

import './styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'todo app',
  description: 'Generated by Fahad tufail',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers >
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning>
          <ToastContainer transition={Slide} />
          {children}
        </body>
      </html>
    </Providers>
  );
}
