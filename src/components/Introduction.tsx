import React from "react";
import bgImg from "../../public/images/bg_01.png";
import Image from "next/image";
import { Space_Mono } from "next/font/google";
import { IoIosArrowForward } from "react-icons/io";

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
    return (
        <section className='m-0 pb-[100px] relative text-white z-0 bg-white w-[100vw] h-auto min-h-[100vh] overflow-hidden'>
            <div className='h-auto w-[1150px] mt-[150px] mx-auto flex justify-start items-center'>
                <div className='flex flex-col justify-start items-start space-y-[40px] w-[58%] h-auto bg-transparent overflow-hidden'>
                    <ul
                        className={`${spaceMono.className} flex flex-row justify-start items-center space-x-4`}
                    >
                        {tagList.map((tag, index) => {
                            return (
                                <li
                                    key={index}
                                    className='p-1 px-[20px] text-[12px] border rounded-full bg-[rgba(25,25,25,1)] border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,1)] hover:text-[rgba(0,0,0,0.7)] cursor-default'
                                >
                                    {tag.title}
                                </li>
                            );
                        })}
                    </ul>
                    <div className='cabinet-grotesk text-[4rem] leading-[4.1rem] break-words text-gradient'>
                        {titleText}
                    </div>
                    <p className='text-[rgba(255,255,255,0.6)] text-left cabinet-grotesk-bold'>
                        {titleAbout}
                    </p>
                    <div
                        className={`${spaceMono.className} flex flex-col justify-start items-start space-y-[10px]`}
                    >
                        <button
                            className={` bg-white text-black flex flex-row justify-center items-center rounded-full border border-black p-[10px] px-[40px] space-x-1`}
                        >
                            <span>Join the Waitlist</span>
                            <IoIosArrowForward />
                        </button>
                        <div className="flex flex-row justify-start items-center space-x-2">
                            <div className="bg-green-400 rounded-full w-[8px] h-[8px]"></div>
                            <span className="text-white text-[12px]">{totalWaitlist} people already signed up</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='-z-50 w-full h-full absolute top-0 left-0 bg-black bg-custom-gradient'>
                <Image
                    src={bgImg}
                    alt='background image'
                    className='w-full h-full'
                />
            </div>
        </section>
    );
};

export default Introduction;
