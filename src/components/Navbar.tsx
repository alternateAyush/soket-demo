import Link from "next/link";
import React from "react";
import { Space_Mono } from "next/font/google";
import iconImage from "../../public/images/icon_01.png";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400"],
});

const navList = [
    { title: "Features", url: "" },
    { title: "Demo", url: "/demo/s2s" },
    { title: "Industries", url: "" },
    { title: "Workflows", url: "" },
    { title: "API Documentation", url: "" },
];

const Navbar = () => {
    return (
        <div className='m-0 p-0 fixed z-10 top-0 left-0 w-[100vw] h-[75px] overflow-hidden text-white border-b border-[rgba(255,255,255,0.12)] bg-[rgba(0,0,0,0.14)]'>
            <div className='p-0 w-[1150px] flex flex-row h-full justify-between items-center mx-auto'>
                <div>
                    <Image
                        src={iconImage}
                        alt='speech-2-speech by soketlabs'
                        width={100}
                        height={46}
                    />
                </div>
                <div
                    className={`${spaceMono.className} flex flex-row justify-between items-center leading-[20px] text-[13px] space-x-4`}
                >
                    <ul
                        className={`flex flex-row justify-between items-center space-x-5 text-[rgba(255,255,255,0.68)]`}
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
                    <button className='flex justify-center items-center space-x-1 p-2 px-[20px] rounded-full border bg-[rgba(25,25,25,1)] border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,1)] hover:text-[rgba(0,0,0,0.7)]'>
                        <span>{`Join the Waitlist`}</span>
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
