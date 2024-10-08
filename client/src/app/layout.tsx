import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header/Header.component';
import { ReduxProvider } from '@/store/reduxProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Dumky Social',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </head>
            <body className={inter.className}>
                <ReduxProvider>
                    <Header />
                    {children}
                </ReduxProvider>
            </body>
        </html>
    );
}
