import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Codenames",
    description: "where does this even show",
    authors: { name: "Clari", url: "https://github.com/Clari-7744" },
    icons: [{ url: "/data/react.svg", type: "image/svg+xml" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta title="Codenames" />
                <link rel="icon" type="image/svg+xml" href="/data/react.svg" />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
