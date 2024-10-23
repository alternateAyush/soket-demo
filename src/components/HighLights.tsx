import React from "react";
import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400"],
});

const sectionName = "Highlights";
const sectionTitle =
    "Seamless Global Communication with Real-Time Multilingual Speech Solutions";
const highlightList = [
    {
        title: "Real-Time Multilingual Translation",
        imgPath: "/images/highlight_01.png",
        para: "Effortlessly translate spoken words across multiple languages for smooth cross-border communication.",
    },
    {
        title: "Automatic Speech Recognition (ASR)",
        imgPath: "/images/highlight_02.png",
        para: "Get instant transcriptions of business calls and interactions, enhancing efficiency and decision-making.",
    },
    {
        title: "Speech-to-Speech Translation",
        imgPath: "/images/highlight_03.png",
        para: "Enable conversations between speakers of different languages, ideal for customer support/international collaboration.",
    },
];

const HighLights = () => {
    return (
        <section className='pt-[100px] pb-[120px] md:pb-0 mt-[-20px] relative rounded-t-3xl text-black z-0 bg-white w-[100vw] h-auto min-h-[100vh] overflow-hidden'>
            <div className='flex flex-col justify-start items-start space-y-[30px] px-2 md:px-0 w-full md:w-[1150px] mx-auto'>
                <span
                    className={`${spaceMono.className} uppercase text-black text-[12px] tracking-[2px] font-bold`}
                >
                    // {sectionName}
                </span>
                <h2 className='w-full md:w-[75%] text-[3rem] cabinet-grotesk-medium break-words'>
                    {sectionTitle}
                </h2>
            </div>
            <div className='w-[100vw] mt-[40px] border-t border-[rgba(0,0,0,0.3)] cabinet-grotesk-medium'>
                <div className='w-full md:w-[1150px] mx-auto grid grid=cols-1 md:grid-cols-3'>
                    {highlightList.map((highlight, index) => {
                        return (
                            <div
                                key={index}
                                className={`${
                                    (index + 1) % 3 == 0
                                        ? `border-transparent`
                                        : `border-[rgba(0,0,0,0.3)]`
                                } border-b md:border-r flex flex-col justify-start items-start space-y-4 p-[20px] md:pb-[120px]`}
                            >
                                <span className='w-full text-right text-[20px] text-[rgba(0,0,0,0.4)]'>
                                    0{index + 1}
                                </span>
                                <div className='w-full h-[350px] mx-auto relative overflow-hidden'>
                                    <img className="object-fit object-center" src={highlight.imgPath} alt={highlight.title}/>
                                </div>
                                <div className='w-full flex flex-col justify-start items-start space-y-3'>
                                    <h3 className='w-full text-black text-[1.8rem]'>
                                        {highlight.title}
                                    </h3>
                                    <p className='w-full text-[18px] text-[rgba(0,0,0,0.4)]'>
                                        {highlight.para}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HighLights;
