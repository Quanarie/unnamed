import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import React from 'react';
import SessionWrapper from '@/app/session-provider';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'unnamed',
  description: 'unnamed',
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang='en'>
      <body className={inter.className}>{children}</body>
      </html>
    </SessionWrapper>

  );
}
