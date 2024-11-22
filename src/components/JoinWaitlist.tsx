"use client";
import React, { useEffect, useState } from "react";
import { Space_Mono } from "next/font/google";
import FormInput from "./FormInput";
import { IoIosArrowForward } from "react-icons/io";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

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
    const [count, setCount] = useState(totalWaitlist);
    const [person, setPerson] = useState({
        name: "",
        email: "",
        website: "",
    });
    const [loading, setLoading] = useState(false);
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
    const onClear = function () {
        setPerson({
            name: "",
            email: "",
            website: "",
        });
    };
    const handleSubmit = async function (
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        // console.log(person);
        try {
            setLoading(true);
            const response = await axios.post("/api/waitlist/join", person);
            // console.log("Sign up successfull: ", response.data!);
            setCount(response.data.totalCount);
            toast.success(response.data.message || "An error occured.", {
                position: "top-right",
            });
        } catch (error: unknown) {
            const errorMessage =
                error instanceof AxiosError
                    ? error.response.data.error
                    : "An unknown error occurred";

            // console.log("signup error: ", error);
            toast.error(errorMessage || "An error occured", {
                position: "top-right",
            });
        } finally {
            onClear();
            setLoading(false);
        }
    };
    return (
        <section id='waitlistFrom' className='text-white w-full my-[20px]'>
            <div className='mt-[30px] md:mt-0 z-0 relative bg-[rgba(0,0,0,0.8)] blurr-border rounded-lg px-3 md:px-0 flex flex-col justify-center items-center space-y-6 mx-auto w-full md:w-[575px] overflow-hidden'>
                <ul
                    className={`${spaceMono.className} flex flex-row flex-wrap justify-center items-center w-full`}
                >
                    {tagList.map((tag, index) => {
                        return (
                            <li
                                key={index}
                                className='my1 mr-2 p-1 px-[20px] font-bold tracking-wider text-[12px] border rounded-full bg-[rgba(25,25,25,1)] border-[rgba(255,255,255,0.12)] cursor-default'
                            >
                                {tag.title}
                            </li>
                        );
                    })}
                </ul>
                <h2 className='w-full md:w-[90%] text-[3.2rem] leading-[3.25rem] text-center cabinet-grotesk break-words text-gradient'>
                    {sectionTitle}
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className={`${spaceMono.className} w-full md:w-[75%] flex flex-col space-y-6 justify-center items-stretch`}
                >
                    <FormInput
                        id={"name"}
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
                        className='backdrop-blur-[10px] flex flex-row justify-center items-center space-x-1 w-full rounded-full bg-[rgba(255,255,255,1)] text-black h-[50px] overflow-hidden active:bg-[rgba(0,0,0,0.7)] active:text-[rgba(255,255,255,1)]'
                    >
                        <span>Join the Waitlist</span>
                        <IoIosArrowForward />
                    </button>
                </form>
                <div className='flex flex-row justify-start items-center space-x-2'>
                    <div className='bg-green-400 rounded-full w-[8px] h-[8px]'></div>
                    <span className='text-white text-[14px]'>
                        {count} people already signed up
                    </span>
                </div>
            </div>
            <div
                className={
                    loading
                        ? `z-10 absolute text-black w-full h-full top-0 left-0 bg-[rgba(255,255,255,0.2)] flex justify-center items-center`
                        : `hidden`
                }
            >
                {/* <span>Loading...</span> */}
                <div role='status'>
                    <svg
                        aria-hidden='true'
                        className='inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                            fill='currentColor'
                        />
                        <path
                            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                            fill='currentFill'
                        />
                    </svg>
                    <span className='sr-only'>Loading...</span>
                </div>
            </div>
        </section>
    );
};
