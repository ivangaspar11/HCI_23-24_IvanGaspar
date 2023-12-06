"use client";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link';
import NavBar from './components/NavBar';
import { useState } from 'react';
import DestinationsSection from './_components/DestinationsSection';
import Footer from './components/Footer';


const pages = {
  Home: "/",
  Adventure: "/adventure-travel",
  Family: "/family-travel",
  CulturalExploration: "/cultural-exploration",
  Support: "/support",
  Contact: "/contact"
};

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
