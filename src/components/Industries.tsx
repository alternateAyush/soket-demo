import React from "react";
import { Space_Mono } from "next/font/google";
import { IoIosArrowForward } from "react-icons/io";
import industryImage_01 from "../../public/images/industry_img_01.png";
import industryImage_02 from "../../public/images/industry_img_02.png";
import industryImage_03 from "../../public/images/industry_img_03.png";
import Image from "next/image";
import Link from "next/link";

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400"],
});

const sectionName = "industries";
const sectionTitle = "S2S API Applications Across Different Industries";
const industryList = [
    {
        title: "Customer Support",
        imgPath: industryImage_01,
        para: "Deliver multilingual, real-time assistance globally through using our API.",
        height: "80px",
    },
    {
        title: "Marketing & Content Creation",
        imgPath: industryImage_02,
        para: "Produce natural-sounding voice content for digital campaigns in any language.",
        height: "60px",
    },
    {
        title: "Workflow Automation",
        imgPath: industryImage_03,
        para: "Use voice to automate tasks like order management and customer inquiries.",
        height: "80px",
    },
];
const industryTagList = [
    { title: "Banking" },
    { title: "Financial Services" },
    { title: "Insurance (BFSI)" },
    { title: "Healthcare" },
    { title: "Telecom" },
    { title: "Edtech" },
];

const Industries = () => {
    return (
        <section
            id={sectionName}
            className='cabinet-grotesk-medium pt-[70px] md:pt-[100px] mt-[-20px] relative rounded-t-[22px] text-white z-0 bg-black w-[100vw] h-auto min-h-[100vh] overflow-hidden'
        >
            <div className='flex flex-col justify-start items-start space-y-[30px] px-3 md:px-0 w-full md:w-[1150px] mx-auto'>
                <span
                    className={`${spaceMono.className} uppercase text-[14px] text-nowrap`}
                >
                    {"// "}
                    {sectionName}
                </span>
                <h2 className='w-full md:w-[50%] text-[2.5rem] md:text-[3rem] leading-[2.6rem] md:leading-[3.1rem] cabinet-grotesk break-words text-gradient'>
                    {sectionTitle}
                </h2>
            </div>
            <div className='mt-[20px] w-full md:w-[1150px] mx-auto px-[20px] md:px-0 grid grid-cols-1 md:grid-cols-3 gap-6 h-auto bg-black'>
                {industryList.map((industry, index) => {
                    return (
                        <div
                            key={index}
                            className='py-[30px] flex flex-col space-y-[20px] justify-start items-start text-white border-b border-white'
                        >
                            <div
                                className={`h-[100px]  overflow-hidden flex justify-start items-end`}
                            >
                                <Image
                                    src={industry.imgPath}
                                    alt={industry.title}
                                    className={`h-[${industry.height}] w-auto object-contain`}
                                />
                            </div>
                            <h3 className='text-[1.5rem]'>{industry.title}</h3>
                            <p className='text-[16px] text-[rgba(255,255,255,0.7)]'>
                                {industry.para}
                            </p>
                            <Link
                                href='/home#industries'
                                className={`${spaceMono.className} hidden pb-1  flex-row space-x-2 justify-start items-center flex-nowrap border-b border-transparent hover:border-white `}
                            >
                                <span className='text-[16px]'>Try Now</span>
                                <IoIosArrowForward size={16} />
                            </Link>
                        </div>
                    );
                })}
            </div>
            <div className='mt-[75px] px-[20px] md:px-0 mx-auto w-full md:w-[1150px] flex flex-col justify-start items-start space-y-[30px]'>
                <div className='flex flex-row justify-start items-center flex-nowrap space-x-2'>
                    <div className='bg-white rounded-full h-[8px] w-[8px]'></div>
                    <span className='text-[rgba(255,255,255,0.7)] text-[18px]'>{`Used accross wide range of Industries:`}</span>
                </div>
                <ul className='w-full hidden md:flex flex-col md:flex-row justify-between items-stretch md:items-start space-y-4 md:space-y-0 md:space-x-4'>
                    {industryTagList.map((industry, index) => {
                        return (
                            <li
                                key={index}
                                className='cabinet-grotesk text-[1.5rem] py-[20px] px-[30px] bg-[rgba(18,18,22,1)] rounded-lg text-center'
                            >
                                <span className='text-nowrap break-keep'>
                                    {industry.title}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className='basic-style md:hidden relative mt-[50px] industries-banner'>
                <div className='basic-style industries-slide'>
                    {industryTagList.map((industry, index) => {
                        return (
                            <div
                                key={index}
                                className='basic-style industries-tag'
                            >
                                <span className='cabinet-grotesk text-[1.5rem] text-nowrap break-keep'>
                                    {industry.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
                <div className='basic-style industries-slide'>
                    {industryTagList.map((industry, index) => {
                        return (
                            <div
                                key={index}
                                className='basic-style industries-tag'
                            >
                                <span className='cabinet-grotesk text-[1.5rem] text-nowrap break-keep select-none'>
                                    {industry.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='-z-[40] w-full h-[150px] bg-custom-gradient-2 opacity-70'></div>
        </section>
    );
};

export default Industries;
