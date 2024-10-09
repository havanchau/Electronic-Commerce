'use client';

import localFont from "next/font/local";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";
import ToastComponent from "@/app/components/ToastContainer/ToastContainer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    setLoading(true);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {loading ? (
          <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            backgroundColor: 'white',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center' 
          }}>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <ToastComponent />
            {children}
          </>
        )}
      </body>
    </html>
  );
}
