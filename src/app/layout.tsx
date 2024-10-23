import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "soketlabs",
    description: "soketlabs",
    icons:['/images/soket_icon.png']
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`antialiased`}>{children}</body>
        </html>
    );
}
