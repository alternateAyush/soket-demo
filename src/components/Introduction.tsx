"use client";
import React, { useEffect, useState } from "react";
import bgImg from "../../public/images/bg_01.png";
import Image from "next/image";
import { Space_Mono } from "next/font/google";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import axios,{AxiosError} from "axios";

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400"],
});

const tagList = [
    { title: "Humane" },
    { title: "Multilingual" },
    { title: "Unified" },
];

const titleText =
    "Real-Time Conversations with Soket AI Labs' Speech-to-Speech API";

const titleAbout =
    "Our cutting-edge Speech-to-Speech API is designed to transform how businesses interact, break language barriers, automate workflows, and enable real-time multilingual communication.";

const totalWaitlist = 234;
const Introduction = () => {
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
            id='about'
            className='pt-[150px] m-0 pb-[120px] relative text-white z-0 bg-black w-[100vw] h-auto min-h-[100vh] overflow-hidden'
        >
            <div className='h-auto w-full px-3 md:px-0 md:w-[1150px] mx-auto flex justify-start items-center'>
                <div className='flex flex-col justify-start items-start space-y-[40px] w-full md:w-[58%] h-auto backdrop-blur-[1px] overflow-hidden'>
                    <ul
                        className={`${spaceMono.className} flex flex-row flex-wrap justify-start items-center w-full`}
                    >
                        {tagList.map((tag, index) => {
                            return (
                                <li
                                    key={index}
                                    className='my-1 mr-2 p-1 px-[20px] font-bold tracking-wider text-[12px] border rounded-full bg-[rgba(25,25,25,1)] border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,1)] hover:text-[rgba(0,0,0,0.7)] cursor-default'
                                >
                                    {tag.title}
                                </li>
                            );
                        })}
                    </ul>
                    <h1 className='w-full cabinet-grotesk-medium text-[4rem] leading-[4.1rem] break-words text-gradient'>
                        {titleText}
                    </h1>
                    <p className='text-[rgba(255,255,255,0.6)] text-left cabinet-grotesk-medium text-[1.1rem] w-full'>
                        {titleAbout}
                    </p>
                    <div
                        className={`${spaceMono.className} flex flex-col justify-start items-start space-y-[10px]`}
                    >
                        <Link
                            href={"/home/waitlist"}
                            className={` bg-white text-black flex flex-row justify-center items-center rounded-full border border-black hover:bg-black hover:text-white hover:border-white p-[10px] px-[40px] space-x-1`}
                        >
                            <span>Join the Waitlist</span>
                            <IoIosArrowForward />
                        </Link>

                        <div className='flex flex-row justify-start items-center space-x-2'>
                            <div className='bg-green-400 rounded-full w-[8px] h-[8px]'></div>
                            <span className='text-white text-[12px]'>
                                {count} people already signed up
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='-z-50 w-full h-full absolute top-0 left-0 bg-black bg-custom-gradient'>
                <Image
                    src={bgImg}
                    alt='background image'
                    className='w-full h-full object-cover object-center'
                />
            </div>
        </section>
    );
};

export default Introduction;
