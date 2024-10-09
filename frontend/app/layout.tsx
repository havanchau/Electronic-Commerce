'use client';

import localFont from "next/font/local";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";
import ToastComponent from "@/app/components/ToastContainer/ToastContainer";
import Header from "./components/Header/Header";
import { LanguageProvider } from "@/context/Lang/LangContext";
import { AuthProvider } from "@/context/Auth/AuthContext";
import "./globals.css";
import Footer from "./components/Footer/Footer";

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

  const hideHeaderRoutes = ['/signin', '/signup', '/not-found'];

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{ margin: 0 }}
      >
        <AuthProvider>
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
            <LanguageProvider>
              <ToastComponent />
              {!hideHeaderRoutes.includes(pathname) && <Header />}
              {children}
              {!hideHeaderRoutes.includes(pathname) && <Footer />}
            </LanguageProvider>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
