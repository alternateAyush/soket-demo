"use client";
import React, { useState } from "react";
import { Space_Mono } from "next/font/google";
import FormInput from "./FormInput";
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

const totalWaitlist = 234;

const sectionTitle = "Join the Waitlist for early access to the API";

export const JoinWaitlist = () => {
    const [person, setPerson] = useState({
        fullName: "",
        email: "",
        website: "",
    });
    const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    };
    return (
        <section id='waitlistFrom' className='text-white w-full my-[20px]'>
            <div className='px-3 md:px-0 flex flex-col justify-center items-center space-y-6 mx-auto w-full md:w-[1150px] overflow-hidden'>
                <ul
                    className={`${spaceMono.className} flex flex-row flex-wrap justify-center items-center w-full`}
                >
                    {tagList.map((tag, index) => {
                        return (
                            <li
                                key={index}
                                className='my1 mr-2 p-1 px-[20px] font-bold tracking-wider text-[12px] border rounded-full bg-[rgba(25,25,25,1)] border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,1)] hover:text-[rgba(0,0,0,0.7)] cursor-default'
                            >
                                {tag.title}
                            </li>
                        );
                    })}
                </ul>
                <h2 className='w-full md:w-[45%] text-[3.2rem] leading-[3.25rem] text-center cabinet-grotesk-medium break-words text-gradient'>
                    {sectionTitle}
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className={`${spaceMono.className} w-full md:w-[35%] flex flex-col space-y-6 justify-center items-stretch`}
                >
                    <FormInput
                        id={"fullName"}
                        person={person}
                        setPerson={setPerson}
                    />
                    <FormInput
                        id={"email"}
                        person={person}
                        setPerson={setPerson}
                    />
                    <FormInput
                        id={"website"}
                        person={person}
                        setPerson={setPerson}
                    />
                    <button
                        type='submit'
                        className='backdrop-blur-[10px] flex flex-row justify-center items-center space-x-1 w-full rounded-full bg-[rgba(255,255,255,0.8)] text-black h-[50px] overflow-hidden active:bg-[rgba(0,0,0,0.7)] active:text-[rgba(255,255,255,1)]'
                    >
                        <span>Join the Waitlist</span>
                        <IoIosArrowForward />
                    </button>
                </form>
                <div className='flex flex-row justify-start items-center space-x-2'>
                    <div className='bg-green-400 rounded-full w-[8px] h-[8px]'></div>
                    <span className='text-white text-[12px]'>
                        {totalWaitlist} people already signed up
                    </span>
                </div>
            </div>
        </section>
    );
};
