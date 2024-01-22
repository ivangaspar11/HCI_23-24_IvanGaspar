"use client";

import Link from "next/link";
import Image from "next/image"; // Import the next/image component
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import { Page } from "./NavBar";
import { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useRouter } from "next/router";

const MainNav = ({ pages }: { pages: Page[] }) => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState('transparent');
  const [textColor, setTextColor] = useState('white');

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor('#ffffff');
        setTextColor('#000000');
      } else {
        setColor('transparent');
        setTextColor('#ffffff');
      }
    };
    window.addEventListener('scroll', changeColor);
  }, []);

  const pathname = usePathname();


  return (
    <div style={{ backgroundColor: `${color}` }} className='fixed left-0 top-0 w-full z-10 ease-in duration-300'>
      <div className='max-w-[1240px] m-auto flex justify-between items-center p-4 text-white'> 
        <Link href='/'>
          {/* Use the next/image component for the logo
          <Image
            src="/logo.png"
            alt="Your Logo Alt Text"
            width={300} // Set your preferred width
            height={300}  // Set your preferred height
          /> */}
        </Link>
        <ul style={{ color: `${textColor}` }} className='hidden sm:flex'>
          {pages.map(({ href, title }) => (
            <li className={cn("p-4", {"border-b-4 border-blue-500":pathname === href, "inline-block": true})} key={href}>
              <Link href={href}>
                <span
                  className={cn(
                    "uppercase whitespace-nowrap font-roboto-condensed text-base px-5 py-3 "
         
                  )}
                >
                  {title}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className='block sm:hidden z-10'>
          {nav ? (
            <AiOutlineClose size={20} style={{ color: `${textColor}` }} />
          ) : (
            <AiOutlineMenu size={20} style={{ color: `${textColor}` }} />
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={
            nav
              ? 'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'
              : 'sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'
          }>
          <ul>
            {pages.map(({ href, title }) => (
              <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500' key={href}>
                <Link href={href}>
                  <span
                    className={cn(
                      "uppercase whitespace-nowrap font-roboto-condensed text-base px-5 py-3 rounded-sm text-brand-purple-900 hover:bg-brand-purple-200",
                      {
                        "inline-block border-b-4 border-blue-500":
                          pathname === href,
                      }
                    )}
                  >
                    {title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
