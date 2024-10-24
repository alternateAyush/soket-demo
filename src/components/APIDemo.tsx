import React from "react";
import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400"],
});

const sectionName = "api demo";
const sectionTitle = "Try out the API in Real-Time";
const instructionList = [
    {
        title: "Enter Text / Record Speech",
    },
    {
        title: "Press Enter / Click Send",
    },
    {
        title: "Get Output",
    },
];

const APIDemo = () => {
    return (
        <section className='pt-[70px] md:pt-[100px] pb-[120px] mt-[-20px] relative rounded-t-3xl text-black z-0 bg-white w-[100vw] h-auto min-h-[100vh] cabinet-grotesk-medium overflow-hidden'>
            <div className='flex flex-col justify-start items-start space-y-[30px] px-3 md:px-0 w-full md:w-[1150px] mx-auto'>
                <span
                    className={`${spaceMono.className} uppercase text-black text-[10px] tracking-[2px]`}
                >
                    {"// "}
                    {sectionName}
                </span>
                <h2 className='w-full md:w-[75%] text-[3rem] leading-[3.1rem] break-words'>
                    {sectionTitle}
                </h2>
                <div className="h-auto relative">
                    <ul className={`${spaceMono.className} z-0 text-[14px] flex flex-row justify-start items-center flex-wrap`}>
                        {
                            instructionList.map((instruction,index)=>{
                                return <li key={index} className={`${(index+1===instructionList.length)? `mr-0`:`mr-4`} my-1 bg-white tracking-wider p-1 px-[20px] border-[1.5px] border-dashed rounded-full border-black`}>
                                    {instruction.title}
                                </li>
                            })
                        }
                    <div className="-z-10 w-full absolute top-1/2 left-0 border-[1.5px] border-dashed border-black"></div>
                    </ul>
                </div>
                <div className="w-full h-[400px] bg-[rgba(249, 249, 249, 1)] border border-[rgba(0, 0, 0, 0.14)] rounded-xl"></div>
            </div>
        </section>
    );
};

export default APIDemo;
