import React from "react";
import { Space_Mono } from "next/font/google";
import { IoIosArrowForward } from "react-icons/io";

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400"],
});

const sectionName = "features";
const sectionTitle = "AI-Driven Voice & Text Automation Solutions";
const featureList = [
    {
        title: "Actionable Commands",
        subTitle: "",
        para: "Automate tasks using speech or text commands, improving productivity and eliminating manual intervention.",
    },
    {
        title: "Speech-RAG",
        subTitle: "(Retrieval-Augmented Generation)",
        para: "Generate context-aware responses in real-time for smarter, more responsive communication.",
    },
    {
        title: "Text-to-Speech",
        subtitle: "(TTS)",
        para: "Deliver human-like audio in multiple languages, creating a personalized and engaging customer experience.",
    },
];

const Features = () => {
    return (
        <section
            id={sectionName}
            className='cabinet-grotesk-medium pt-[70px] md:pt-[100px] mt-[-20px] relative rounded-t-3xl text-white z-0 bg-black w-[100vw] h-auto min-h-[100vh] overflow-hidden'
        >
            <div className='flex flex-col justify-start items-start space-y-[30px] px-3 md:px-0 w-full md:w-[1150px] mx-auto'>
                <span
                    className={`${spaceMono.className} uppercase text-[10px] tracking-[2px]`}
                >
                    {"// "}
                    {sectionName}
                </span>
                <h2 className='w-full md:w-[50%] text-[3rem] cabinet-grotesk-medium break-words text-gradient'>
                    {sectionTitle}
                </h2>
                <div className='w-full flex flex-col justify-start items-start space-y-[40px]'>
                    <div className='pt-3 px-3 md:py-0 md:px-0 w-full flex flex-col md:flex-row space-y-4 md:space-y-0 justify-evenly items-center h-auto border border-[rgba(0,0,0,0.3)] rounded-xl bg-[rgba(18,19,24,1)]'>
                        <div className='h-auto flex flex-col items-start space-y-4 w-full md:w-2/6'>
                            <h3 className='text-white text-[1.5rem]'>
                                {featureList[0].title}
                            </h3>
                            <p className='text-[rgba(255,255,255,0.7)] text-[16px]'>
                                {featureList[0].para}
                            </p>
                            <button className='flex flex-row justify-center items-center space-x-2 rounded-lg text-[16px] p-2 border border-transparent hover:border-white'>
                                <span>Try Now</span>
                                <IoIosArrowForward/>
                            </button>
                        </div>
                        <div className='h-[300px] flex flex-col space-y-4 w-full md:w-2/6 bg-black'></div>
                    </div>
                    <div className='w-full flex flex-row space-x-[40px] justify-between items-center h-[500px]'>
                        <div className='w-full h-full border border-[rgba(0,0,0,0.3)] rounded-xl bg-[rgba(18,19,24,1)]'></div>
                        <div className='w-full h-full border border-[rgba(0,0,0,0.3)] rounded-xl bg-[rgba(18,19,24,1)]'></div>
                    </div>
                </div>
            </div>
            <div className='w-full h-[120px] bg-custom-gradient-2 opacity-50'></div>
        </section>
    );
};

export default Features;
