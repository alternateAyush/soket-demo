"use client";
import React from "react";
import { Space_Mono } from "next/font/google";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Link from "next/link";

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400"],
});

const sectionName = "demoVideos";
const sectionTitle = "See How It Works: Real-World Use Cases in Action";
const demoVideostList = [
    {
        title: "BFSI (Banking, Financial Services And Insurance)",
        description:
            "Banking Agent tries selling a new credit card to an existing customer.",
        imgUrl: "",
        videoUrl: "",
    },
    {
        title: "Healthcare",
        description:
            "Healthcare agent books an appointment for a patient with a specific doctor.",
        imgUrl: "",
        videoUrl: "",
    },
    {
        title: "Telecom",
        description:
            "Telecom agent tries to uspell new postpaid plans to an existing customer.",
        imgUrl: "",
        videoUrl: "",
    },
    { title: "Banking", description: "", imgUrl: "", videoUrl: "" },
    { title: "Financial Services", description: "", imgUrl: "", videoUrl: "" },
    { title: "Edtech", description: "", imgUrl: "", videoUrl: "" },
];

const DemoVideos = () => {
    const handleClick = function (btn: string) {
        console.log("click");
    };
    return (
        <section
            id={sectionName}
            className='pt-[70px] md:pt-[100px] pb-[120px] mt-[-20px] relative rounded-t-3xl text-black z-0 bg-white w-[100vw] h-auto min-h-[100vh] overflow-hidden'
        >
            <div className='flex flex-col justify-start items-start space-y-[30px] px-3 md:px-0 w-full md:w-[1150px] mx-auto'>
                <span
                    className={`${spaceMono.className} uppercase text-black text-[10px] tracking-[2px]`}
                >
                    {"// "}
                    {`api demo`}
                </span>
                <div className='w-full flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0'>
                    <h2 className='w-full md:w-[50%] text-[3rem] leading-[3.1rem] cabinet-grotesk break-words'>
                        {sectionTitle}
                    </h2>
                    <div className='flex flex-row justify-between items-center space-x-6 flex-nowrap'>
                        <button
                            onClick={() => {
                                handleClick("left");
                            }}
                            className='h-[90px] w-[90px] rounded-full flex justify-center items-center border border-black text-black opacity-25 hover:opacity-100'
                        >
                            <BsArrowLeft size={30} />
                        </button>
                        <button
                            onClick={() => {
                                handleClick("right");
                            }}
                            id='right'
                            className='h-[90px] w-[90px]  rounded-full flex justify-center items-center border border-black text-black opacity-25 hover:opacity-100'
                        >
                            <BsArrowRight size={30} />
                        </button>
                    </div>
                </div>
            </div>
            <div className='relative mt-[50px] w-full md:w-[1150px] mx-auto px-[20px] md:px-0 overflow-hidden'>
                <div className='h-full w-[50px] absolute z-10 top-0 left-0 blurr-border-2'></div>
                <ul
                    className={`w-full flex flex-row justify-start items-stretch flex-nowrap space-x-6`}
                >
                    {demoVideostList.map((demo, index) => {
                        return (
                            <li key={index}>
                                <Link
                                    href={demo.videoUrl}
                                    className={`flex flex-col justify-start items-start space-y-6 w-[400px] overflow-hidden`}
                                >
                                    <div className='bg-black h-[300px] w-full rounded-lg relative flex justify-center items-center'>
                                        <span className='text-white'>
                                            ...Coming Soon
                                        </span>
                                    </div>
                                    <div className='w-[80%] flex flex-col justify-start items-start space-y-4'>
                                        <h3 className='cabinet-grotesk-medium w-full block text-[1.3rem] leading-[1.5rem] text-black truncate overflow-hidden whitespace-nowrap'>
                                            {demo.title}
                                        </h3>
                                        <span className='cabinet-grotesk-bold text-[16px] text-[rgba(0,0,0,0.5)]'>
                                            {demo.description}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <div className='h-full w-[50px] absolute top-0 right-0 blurr-border-3'></div>
            </div>
        </section>
    );
};

export default DemoVideos;
