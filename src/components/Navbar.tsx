"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Space_Mono } from "next/font/google";
import iconImage from "../../public/images/icon_01.png";
import Image from "next/image";
import { IoIosArrowForward, IoIosMenu } from "react-icons/io";
import { BiLoaderCircle } from "react-icons/bi";

// import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { usePathname } from "next/navigation";

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400"],
});

const navList = [
    { title: "Features", url: "/home#features" },
    { title: "Demo", url: "/demo/s2s" },
    { title: "Usecases", url: "/home#usecases" },
    { title: "Testimonials", url: "/home#testimonials" },
    { title: "Documentation", url: "/" },
];

const Navbar = () => {
    const pathName = usePathname();
    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState(false);
    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <nav
            id='nav'
            className='m-0 p-0 fixed z-10 top-0 left-0 w-[100vw] h-auto md:h-[80px] overflow-hidden text-white border-b border-[rgba(255,255,255,0.12)] bg-[rgba(0,0,0,0.6)] backdrop-blur-[8px]'
        >
            <div className='px-3 md:p-0 my-auto md:my-0 w-full md:w-[1150px] flex flex-row h-[80px] md:h-full justify-between items-center mx-auto'>
                <Link href={"/home#introduction"} className='w-[100px]'>
                    <Image
                        src={iconImage}
                        alt='speech-2-speech by soketlabs'
                        className='w-full h-auto object-contain object-left'
                    />
                </Link>
                <div
                    className={`${spaceMono.className} flex flex-row justify-between items-center leading-[20px] text-[13px] space-x-4`}
                >
                    <ul
                        className={`hidden md:flex md:flex-row md:justify-between md:items-center md:space-x-5 text-[rgba(255,255,255,0.68)]`}
                    >
                        {navList.map((navItem, index) => {
                            return (
                                <li key={index}>
                                    <Link href={navItem.url}>
                                        <span className='hover:underline-offset-4 hover:underline hover:text-[rgba(255,255,255,0.8)]'>
                                            {navItem.title}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    {pathName !== "/home/waitlist" ? (
                        <Link
                            href={"/home/waitlist"}
                            className='hidden md:flex justify-center items-center space-x-1 p-2 px-[20px] rounded-full border bg-[rgba(25,25,25,1)] border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,1)] hover:text-[rgba(0,0,0,0.7)]'
                        >
                            <span>{`Join the Waitlist`}</span>
                            <IoIosArrowForward />
                        </Link>
                    ) : (
                        <></>
                    )}
                    <button
                        onClick={() => {
                            setMenu(!menu);
                        }}
                        className='inline md:hidden p-1 text-[rgba(255,255,255,0.68)] rounded-full active:bg-[rgba(255,255,255,0.3)]'
                    >
                        {menu ? (
                            <IoIosMenu size={25} />
                        ) : (
                            <IoIosMenu size={25} />
                        )}
                    </button>
                </div>
            </div>
            <div className='block md:hidden w-full h-auto'>
                {" "}
                <div
                    className={`${
                        menu
                            ? `z-10 w-full h-[100vh] flex flex-col justify-start items-center overflow-hidden`
                            : `hidden`
                    } md:hidden`}
                >
                    <ul className='mt-[150px] flex flex-col justify-start items-start space-y-4 text-[1.25rem]'>
                        {navList.map((navItem, index) => {
                            return (
                                <li key={index}>
                                    <Link
                                        href={navItem.url}
                                        onClick={() => {
                                            setMenu(!menu);
                                        }}
                                    >
                                        <span className='hover:underline-offset-4 hover:underline hover:text-[rgba(255,255,255,0.8)]'>
                                            {navItem.title}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                        {pathName !== "/home/waitlist" ? (
                            <div className='w-full flex justify-center items-center'>
                                <Link
                                    href={"/home/waitlist"}
                                    onClick={() => {
                                        setLoading(true);
                                        setMenu(!menu);
                                    }}
                                    className='tracking-[2px] flex justify-center items-center space-x-1 p-2 py-[10px] px-[30px] rounded-full border bg-[rgba(25,25,25,1)] border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,1)] hover:text-[rgba(0,0,0,0.7)]'
                                >
                                    <span
                                        className={`${
                                            !loading ? "inline" : "hidden"
                                        }`}
                                    >
                                        Join the Waitlist
                                    </span>
                                    <IoIosArrowForward
                                        className={`${
                                            !loading ? "inline" : "hidden"
                                        }`}
                                    />
                                    <BiLoaderCircle
                                        size={25}
                                        className={`${
                                            loading ? "inline" : "hidden"
                                        } load-animation`}
                                    />
                                </Link>
                            </div>
                        ) : (
                            <></>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
