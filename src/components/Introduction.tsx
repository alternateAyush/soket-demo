"use client";
import React, { useEffect, useState } from "react";
import bgImg from "../../public/images/bg_01.png";
import Image from "next/image";
import { Space_Mono } from "next/font/google";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import VoiceAgent from "./VoiceAgent";

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400"],
});

const tagList = [
    { title: "Humane" },
    { title: "Multilingual" },
    { title: "Unified" },
];

const titleTextMobile = "Soket AI Labs' S2S API";
const titleText =
    "Real-Time Conversations with Soket AI Labs' Speech-to-Speech API";
const subtitleText = "Real-time conversation agent";
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
            id='introduction'
            className='pt-[150px] px-[20px] md:px-0 m-0 pb-[120px] relative text-white z-0 bg-black w-[100vw] h-auto min-h-[100vh] overflow-hidden'
        >
            <div className='h-auto w-full md:w-[1150px] mx-auto flex justify-between items-center'>
                <div className='flex flex-col justify-start items-center md:items-start space-y-[40px] w-full md:w-[58%] h-auto backdrop-blur-[1px] overflow-hidden'>
                    <ul
                        className={`${spaceMono.className} flex flex-row flex-wrap justify-center md:justify-start items-center w-full`}
                    >
                        {tagList.map((tag, index) => {
                            return (
                                <li
                                    key={index}
                                    className='my-1 mr-2 p-1 px-[10px] md:px-[20px] font-bold tracking-wider text-[12px] border rounded-full bg-[rgba(25,25,25,1)] border-[rgba(255,255,255,0.12)] cursor-default'
                                >
                                    {tag.title}
                                </li>
                            );
                        })}
                    </ul>
                    <h1 className='hidden md:block w-full text-left cabinet-grotesk-medium text-[4rem] leading-[4.1rem] break-words text-gradient'>
                        {titleText}
                    </h1>
                    <div className='md:hidden flex flex-col justify-start items-center space-y-3'>
                        <h1 className='w-full text-center md:text-left cabinet-grotesk-medium text-[3.5rem] leading-[3.7rem] md:text-[4rem] md:leading-[4.1rem] break-words text-gradient'>
                            {titleTextMobile}
                        </h1>
                        <h2 className='w-full text-center  cabinet-grotesk text-[1.5rem] leading-[1.6rem] break-words text-[rgba(255,255,255,0.6)]'>
                            {subtitleText}
                        </h2>
                    </div>
                    <VoiceAgent styles='w-full flex md:hidden' />

                    <p className='w-full text-[rgba(255,255,255,0.6)] text-center md:text-left cabinet-grotesk-medium text-[1.1rem]'>
                        {titleAbout}
                    </p>
                    <div
                        className={`${spaceMono.className} w-full flex flex-col justify-start items-center md:items-start space-y-[10px]`}
                    >
                        <Link
                            href={"/home/waitlist"}
                            className={` w-full md:w-auto bg-white text-black flex flex-row justify-center items-center rounded-full border border-black hover:bg-black hover:text-white hover:border-white p-[10px] px-[40px] space-x-1`}
                        >
                            <span className='text-[18px]'>
                                Join the Waitlist
                            </span>
                            <IoIosArrowForward />
                        </Link>

                        <div className='flex flex-row justify-start items-center space-x-2'>
                            <div className='bg-green-400 rounded-full w-[8px] h-[8px]'></div>
                            <span className='text-white text-[12px] text-center'>
                                {count} people already signed up
                            </span>
                        </div>
                    </div>
                </div>
                <VoiceAgent styles='hidden md:flex w-[400px]' />
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
