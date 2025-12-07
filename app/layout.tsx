import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pokédex Lite - Discover Your Favorite Pokémon',
  description:
    'A modern, responsive Pokédex application built with Next.js. Browse, search, and save your favorite Pokémon.',
  keywords: ['pokemon', 'pokedex', 'nextjs', 'react', 'typescript'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
            <Header />
            <main className="container mx-auto px-4 py-8">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
