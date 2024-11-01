"use client";
import React, { useEffect, useState } from "react";
import { Space_Mono } from "next/font/google";
import Image from "next/image";
import bgImg from "../../public/images/bg_02.png";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import axios, { AxiosError } from "axios";

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400"],
});

const sectionName = "waitlist";
const sectionTitle = "Join the Waitlist for Early Access";
const para =
    "Get in while you still can! Our revolutionary Speech-to-Speech API is about to change the game, and you don’t want to be left behind. Join the waitlist now and claim your front-row seat to the future of voice technology!";
const totalWaitlist = 234;

const Waitlist = () => {
    const [count, setCount] = useState(totalWaitlist);
    useEffect(() => {
        const getTotalCount = async function () {
            try {
                const response = await axios.get(
                    "/api/waitlist/personList/total"
                );
                setCount(response.data.totalCount);
            } catch (error: unknown) {
                const errorMessage =
                    error instanceof AxiosError
                        ? error.response.data.error
                        : "An unknown error occurred";

                console.log("totalCount error: ", errorMessage);
            }
        };
        getTotalCount();
    }, []);
    return (
        <section
            id={sectionName}
            className='pt-[70px] md:pt-[100px] md:pb-0 mt-[-20px] relative rounded-t-3xl text-black bg-white z-0 w-[100vw] h-auto overflow-hidden'
        >
            <div className='cabinet-grotesk-medium mb-[50px] px-[20px] md:px-0 w-full md:w-[1150px] mx-auto'>
                <div className='w-full mx-auto md:w-[60%] flex flex-col justify-start items-center space-y-[30px]'>
                    <span
                        className={`${spaceMono.className} uppercase text-[10px] tracking-[2px]`}
                    >
                        {"// "}
                        {sectionName}
                    </span>
                    <h2 className='w-full text-[3.5rem] leading-[3.6rem] md:text-[5rem] md:leading-[5.1rem] break-words text-center cabinet-grotesk'>
                        {sectionTitle}
                    </h2>
                    <p className='w-[80%] text-[16px] text-center'>{para}</p>
                    <div
                        className={`${spaceMono.className} flex flex-col justify-start items-center space-y-[10px]`}
                    >
                        <Link
                            href={"/home/waitlist"}
                            className={` bg-black text-white flex flex-row justify-center items-center rounded-full border border-white hover:bg-white hover:text-black hover:border-black p-[10px] px-[40px] space-x-1`}
                        >
                            <span>Join the Waitlist</span>
                            <IoIosArrowForward />
                        </Link>

                        <div className='flex flex-row justify-start items-center space-x-2'>
                            <div className='bg-green-400 rounded-full w-[8px] h-[8px]'></div>
                            <span className='text-black text-[12px]'>
                                {count} people already signed up
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='-z-40 w-full h-[150px] bg-custom-gradient-3 opacity-70'></div>
            <div className='-z-50 w-full h-full absolute top-0 left-0 bg-white'>
                <Image
                    src={bgImg}
                    alt='background image'
                    className='w-full h-full opacity-30 object-cover object-center'
                />
            </div>
        </section>
    );
};

export default Waitlist;
