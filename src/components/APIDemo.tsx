import React from "react";
import { Space_Mono } from "next/font/google";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { GoArrowSwitch } from "react-icons/go";
import { RxSpeakerLoud } from "react-icons/rx";
import { HiOutlineMicrophone } from "react-icons/hi2";
import atom from '../../public/images/atom.png'
import Image from "next/image";

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

const inputPlaceholder = "Enter the text you want to translate......";

const APIDemo = () => {
    return (
        <section id='apiDemo' className='pt-[70px] md:pt-[100px] pb-[120px] mt-[-20px] relative rounded-t-3xl text-black z-0 bg-white w-[100vw] h-auto min-h-[100vh] cabinet-grotesk-medium overflow-hidden'>
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
                <div className='h-auto relative'>
                    <ul
                        className={`${spaceMono.className} p-0 z-0 text-[14px] flex flex-col  md:flex-row justify-start items-start md:items-center flex-wrap overflow-y-hidden`}
                    >
                        {instructionList.map((instruction, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`${
                                        index + 1 === instructionList.length
                                            ? `mr-0`
                                            : `mr-4`
                                    } bg-white mb-4 md:mb-0 tracking-wider p-1 px-[20px] border-[1.5px] border-dashed rounded-full border-black hover:bg-[rgba(217,217,217,1)] hover:border-solid`}
                                >
                                    {instruction.title}
                                </li>
                            );
                        })}
                        <div className='-z-10 w-full hidden md:inline absolute top-1/2 left-0 border-[1.5px] border-dashed border-black'></div>
                        <div className='-z-10 h-[80%] absolute top-0 left-5 border-[1.5px] border-dashed border-black'></div>
                    </ul>
                </div>
                <div className='w-full h-auto py-[30px] px-[10px] md:p-[30px] bg-[rgba(250,250,250,1)] border border-[rgba(0,0,0,0.3)] rounded-xl'>
                    <div className='mx-auto md:mx-0 w-full h-auto md:h-[40px] flex flex-col md:flex-row justify-center md:justify-between items-stretch space-y-4 md:space-y-0'>
                        <div className='py-2 md:py-0 px-[20px] flex justify-center items-center space-x-1 flex-nowrap bg-white text-[rgba(0,0,0,0.3)] rounded-full border border-[rgba(0,0,0,0.3)] shadow-md hover:text-[rgba(0,0,0,1)] hover:border-[rgba(0,0,0,1)]'>
                            <span className='text-[14px]'>
                                Speech to Speech
                            </span>
                            <IoIosArrowDown size={16} />
                        </div>
                        <div className='py-2 md:py-0 rounded-lg px-1 bg-white flex flex-row flex-nowrap justify-between md:justify-center items-center space-x-2 text-[rgba(0,0,0,0.3)] text-[12px] hover:text-black'>
                            <div className='bg-[rgba(246,246,246,1)] border border-[rgba(0,0,0,0.3)] p-1 px-[20px] rounded-lg flex flex-row flex-nowrap justify-center items-center space-x-1 shadow-sm hover:bg-white hover:border-black'>
                                <span>English</span>
                                <IoIosArrowDown size={14} />
                            </div>
                            <GoArrowSwitch size={16} />
                            <div className='bg-[rgba(246,246,246,1)] border border-[rgba(0,0,0,0.3)] p-1 px-[20px] rounded-lg flex flex-row flex-nowrap justify-center items-center space-x-1 shadow-sm hover:bg-white hover:border-black'>
                                <span>Hindi</span>
                                <IoIosArrowDown size={14} />
                            </div>
                        </div>
                    </div>
                    <div className='mt-[125px] flex flex-row justify-end items-center w-full flex-nowrap'>
                        <div className='py-[15px] px-[30px] rounded-full text-[16px] bg-[rgba(217,217,217,0.5)] text-[rgba(0,0,0,1)]'>
                            <span>{`Hello, how are you?`}</span>
                        </div>
                    </div>
                    <div className='mt-[30px] flex flex-row flex-nowrap justify-start items-center space-x-2'>
                        <div className="h-[40px] w-[40px] flex flex-row justify-center items-center border rounded-full border-[rgba(0,0,0,0.3)] bg-white overflow-hidden">
                            <Image src={atom} alt="atom icon" className="w-1/2 h-auto object-contain object-center"/>
                        </div>
                        <span className="text-[14px] text-[rgba(0,0,0,0.5)]">{`Transcribing it....`}</span>
                    </div>
                    <div className='mt-[5px] flex flex-row justify-start items-center w-full flex-nowrap space-x-4'>
                        <div className='ml-[40px] py-[15px] px-[30px] rounded-full text-[16px] bg-[rgba(217,217,217,0.5)] text-[rgba(0,0,0,1)]'>
                            <span>{`नमस्ते, आप कैसे हैं`}</span>
                        </div>
                        <div className='p-[20px] flex justify-center items-center rounded-full bg-[rgba(217,217,217,0.5)] text-[rgba(0,0,0,0.5)] hover:bg-white hover:text-black'>
                            <div className='rounded-full h-[20px] w-[20px] overflow-hidden'>
                                <RxSpeakerLoud size={20} />
                            </div>
                        </div>
                    </div>
                    <div className='mt-[30px] flex flex-row justify-between items-center w-full flex-nowrap space-x-1 md:space-x-4'>
                        <div className='flex flex-row justify-between items-center w-full rounded-full bg-white overflow-hidden border border-[rgba(0,0,0,0.1)]'>
                            <input
                                className={`${spaceMono.className} w-full h-full p-[10px] md:pl-[30px] pr-[10px] outline-none text-[12px] md:text-[14px] md:word-spacing overflow-hidden text-ellipsis`}
                                placeholder={inputPlaceholder}
                            />
                            <button className='flex flex-row justify-center items-center flex-nowrap space-x-2 button-gradient px-[8px] md:px-[30px] py-[10px] rounded-full text-[16px] text-white'>
                                <span className='hidden md:inline'>
                                    Translate
                                </span>
                                <IoIosArrowForward size={15} />
                            </button>
                        </div>
                        <button className='h-[40px] w-[40px] md:h-[50px] md:w-[50px] rounded-[60px] flex flex-row justify-center items-center button-gradient text-white border-2 border-[rgba(255,255,255,0.3)] overflow-hidden'>
                            <HiOutlineMicrophone size={25} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default APIDemo;
