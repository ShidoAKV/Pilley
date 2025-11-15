import { Roboto } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Loadingcomponent from "./loading";

const outfit = Roboto({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "Pilley",
  description: "Ecommerce T-shirt Site ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-PP9P37GZ5K"></Script>
          <Script id="google-analytics">
        { ` window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-PP9P37GZ5K');`}
          </Script>
          
        </head>
        <body className={`${outfit.className} antialiased text-gray-700`}  >
          <Toaster />
          <AppContextProvider>
            <Navbar />
            <Suspense fallback={<Loadingcomponent />} >{children}</Suspense>

            <Script
              src="https://checkout.razorpay.com/v1/checkout.js"
              strategy="afterInteractive"
            />
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}