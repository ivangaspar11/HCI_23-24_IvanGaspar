"use client";
import Link from 'next/link';
import { useState } from 'react';
import { FaHome } from 'react-icons/fa'
import MainNav from './MainNav';




export type Page = {
  href: string;
  title: string;
};

const pages: Page[] = [
  { href: "/", title: "Home" },
  { href: "/adventureTravel", title: "Adventure Travel" },
  { href: "/cultural-exploration", title: "Cultural Exploration" },
  { href: "/family-travel", title: "Family Travel" },
  { href: "/support", title: "Support" },
  { href: "/contact", title: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
     <div className="container flex items-center justify-between">
      { 
      //<Logo />
      <MainNav pages={pages} />
     // <Hamburger open={open} clickHandler={setOpen} />
    //  <MobileNav open={open} clickHandler={setOpen} pages={pages} />
      }</div>
  );
};

export default Navbar;

