import React from "react";
import { Space_Mono } from "next/font/google";
import { IoIosArrowForward } from "react-icons/io";
import featureImage_01 from "../../public/images/feature_img_01.png";
import featureImage_02 from "../../public/images/feature_img_02.png";
import featureImage_03 from "../../public/images/feature_img_03.png";
import Image from "next/image";
import Link from "next/link";

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
        imgPath: featureImage_01,
        para: "Automate tasks using speech or text commands, improving productivity and eliminating manual intervention.",
    },
    {
        title: "Speech-RAG",
        subTitle: "(Retrieval-Augmented Generation)",
        imgPath: featureImage_02,
        para: "Generate context-aware responses in real-time for smarter, more responsive communication.",
    },
    {
        title: "Text-to-Speech",
        subTitle: `(TTS)`,
        imgPath: featureImage_03,
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
                <h2 className='w-full md:w-[50%] text-[3rem] leading-[3.1rem] cabinet-grotesk-medium break-words text-gradient'>
                    {sectionTitle}
                </h2>
                <div className='w-full flex flex-col justify-start items-start space-y-[40px]'>
                    <div className='w-full flex flex-col md:flex-row space-y-4 md:space-y-0 justify-evenly items-center h-auto border border-[rgba(0,0,0,0.3)] rounded-xl bg-[rgba(17,19,23,1)]'>
                        <div className='mt-3 px-3 md:px-0 md:mt-0 md:mx-0 h-auto flex flex-col items-start space-y-4 w-full md:w-2/6'>
                            <h3 className='text-white text-[1.5rem]'>
                                {featureList[0].title}
                            </h3>
                            <p className='text-[rgba(255,255,255,0.7)] text-[16px]'>
                                {featureList[0].para}
                            </p>
                            <Link href="/home#features" className='flex flex-row justify-center items-center space-x-2 rounded-lg text-[16px] p-2 border border-transparent hover:border-white'>
                                <span>Try Now</span>
                                <IoIosArrowForward />
                            </Link>
                        </div>
                        <div className='h-[250px] md:h-[300px] md:w-[48%] bg-transparent rounded-b-xl md:rounded-none overflow-hidden'>
                            <Image
                                src={featureList[0].imgPath}
                                alt={featureList[0].title}
                                className='h-full object-contain object-bottom'
                            />
                        </div>
                    </div>
                    <div className='w-full flex flex-col md:flex-row space-y-[40px] md:space-y-0 md:space-x-[40px] justify-between items-center h-auto md:h-[500px]'>
                        <div className='flex flex-col justify-between items-center space-y-6 md:space-y-0 w-full h-auto md:h-full  border border-[rgba(0,0,0,0.3)] rounded-xl bg-[rgba(17,19,23,1)] md:overflow-hidden'>
                            <div className='md:mt-[50px] h-auto flex flex-col items-start space-y-4 w-full md:w-[75%] mx-auto'>
                                <div className='mt-3 mx-3 md:mt-0 md:mx-0 w-full flex flex-row justify-start items-center flex-wrap space-x-2'>
                                    <h3 className='inline text-white text-[1.5rem]'>
                                        {featureList[1].title}
                                    </h3>
                                    <h5 className='inline text-[rgba(255,255,255,0.7)] text-[1.1rem] break-words'>
                                        {featureList[1].subTitle}
                                    </h5>
                                </div>
                                <p className='mx-3 md:mx-0 text-[rgba(255,255,255,0.7)] text-[16px]'>
                                    {featureList[1].para}
                                </p>
                            </div>
                            <div className='h-[250px] md:h-[300px] w-full bg-transparent rounded-b-xl'>
                                <Image
                                    src={featureList[1].imgPath}
                                    alt={featureList[1].title}
                                    className='h-full object-contain object-bottom'
                                />
                            </div>
                        </div>
                        <div className='flex flex-col justify-between items-center space-y-6 md:space-y-0 w-full h-auto md:h-full  border border-[rgba(0,0,0,0.3)] rounded-xl bg-[rgba(17,19,23,1)] md:overflow-hidden'>
                            <div className='md:mt-[50px] h-auto flex flex-col items-start space-y-4 w-full md:w-[75%] mx-auto'>
                                <div className='mt-3 mx-3 md:mt-0 md:mx-0 w-full flex flex-row justify-start items-center flex-wrap space-x-2'>
                                    <h3 className='inline text-white text-[1.5rem]'>
                                        {featureList[2].title}
                                    </h3>
                                    <h5 className='inline text-[rgba(255,255,255,0.7)] text-[1.1rem] break-words'>
                                        {featureList[2].subTitle}
                                    </h5>
                                </div>
                                <p className='mx-3 md:mx-0 text-[rgba(255,255,255,0.7)] text-[16px]'>
                                    {featureList[2].para}
                                </p>
                            </div>
                            <div className='h-[250px] md:h-[300px] w-full bg-transparent rounded-b-xl'>
                                <Image
                                    src={featureList[2].imgPath}
                                    alt={featureList[2].title}
                                    className='h-full object-contain object-bottom'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='-z-[40] w-full h-[150px] bg-custom-gradient-2 opacity-70'></div>
        </section>
    );
};

export default Features;
