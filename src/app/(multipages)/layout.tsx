import type { Metadata } from "next";
import Footer from "@/app/components/Footer"
import Header from "./components/Header";
import "../globals.css";
import {Inter, Open_Sans, Great_Vibes} from "next/font/google";


const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-greatVibes'
})
const openSans = Open_Sans({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-open-sans'
})
const inter = Inter({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: "FoodTuck",
  description: "Generated by create next app",
  icons: {
    icon: '/home.png',
  },
};

export default function AuthLayout({children}: {children:React.ReactNode}) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${inter.variable} ${greatVibes.variable} antialiased`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
    
  );
}