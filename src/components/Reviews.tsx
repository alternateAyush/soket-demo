import React from "react";
import { Space_Mono } from "next/font/google";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import r_com_icon from "../../public/images/r_company_icon.png";
import bgImg from "../../public/images/review_img_bg.png";

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400"],
});

const sectionName = "reviews";
const sectionTitle = "S2S API Applications Across Different Industries";

// const reviewList = [
//     {
//         para: "Changing our CRM platform to helps me keep a clean, organized ledger that I can access in the anywhere system. I also love the financial from reports! Integer Sed the of scelerisque odio in tellus scelerisque fringilla.",
//     },
// ];

const Reviews = () => {
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
                    {`features`}
                </span>
                <h2 className='w-full md:w-[50%] text-[3rem] leading-[3.1rem] cabinet-grotesk break-words text-gradient'>
                    {sectionTitle}
                </h2>
            </div>
            <div className='cabinet-grotesk-medium mt-[50px] p-[10px] md:p-[30px] bg-[rgba(24,25,31,1)] w-[95%] mx-auto md:w-[1150px] flex flex-col md:flex-row justify-between items-center md:space-y-0 rounded-xl border border-[rgba(255,255,255,0.1)]'>
                <div className='w-full md:w-[45%] flex flex-col justify-between items-start space-y-10 bg-[rgba(18,20,24,1)] rounded-xl border border-[rgba(255,255,255,0.1)] overflow-hidden'>
                    <div className='flex flex-col justify-start items-start w-full pt-[30px] px-[40px]'>
                        <h3 className='text-gradient text-[3rem] cabinet-grotesk'>{`200 +`}</h3>
                        <span className='text-[rgba(255,255,255,0.7)]'>{`People who love us over the world`}</span>
                    </div>
                    <div className='w-full md:h-[300px] bg-transparent rounded-b-lg'>
                        <Image
                            src={bgImg}
                            alt='world-map'
                            className='w-full h-auto object-contain object-bottom'
                        />
                    </div>
                </div>
                <div className='mt-[50px] md:mt-0 h-full w-full md:w-[50%] flex flex-col justify-start items-start space-y-[40px]'>
                    <p className='w-full md:w-[75%] inline text-[1.2rem] cabinet-grotesk text-[rgba(255,255,255,0.7)]'>
                        {`‘’Changing our `}
                        <span className='cabinet-grotesk-bold text-white'>{`CRM platform`}</span>
                        {` to helps me keep a clean, organized ledger that I can access in the `}
                        <span className='cabinet-grotesk-bold text-white'>{`anywhere system.`}</span>
                        {` I also love the `}
                        <span className='cabinet-grotesk-bold text-white'>{`financial from reports!`}</span>
                        {` Integer Sed the of scelerisque odio in `}
                        <span className='cabinet-grotesk-bold text-white'>{`tellus scelerisque fringilla.`}</span>
                    </p>
                    <div className='w-full border border-[rgba(255,255,255,0.1)]'></div>
                    <div className='w-3/4 md:w-full flex flex-col justify-start items-start space-y-2'>
                        <div className='w-full flex flex-row justify-between items-start'>
                            <div className='flex flex-col justify-start items-start space-y-2 flex-wrap'>
                                <h6 className='cabinet-grotesk-bold text-[1rem]'>{`Savannah Nguyen`}</h6>
                                <span className='text-[rgba(255,255,255,0.6)] text-[14px] break-words'>{`Co-founder, Asfera Technologies Private Limited`}</span>
                            </div>
                            <div className='hidden md:flex flex-row justify-between items-center space-x-2'>
                                <button className='flex justify-center items-center rounded-full h-[40px] w-[40px] border-2 border-[rgba(255,255,255,0.2)] text-[rgba(255,255,255,0.2)] hover:text-[rgba(255,255,255,0.4)] hover:border-[rgba(255,255,255,0.4)]'>
                                    <FaArrowLeft size={18} />
                                </button>
                                <button className='flex justify-center items-center rounded-full h-[40px] w-[40px] border-2 border-[rgba(255,255,255,0.2)] text-[rgba(255,255,255,0.2)] hover:text-[rgba(255,255,255,0.4)] hover:border-[rgba(255,255,255,0.4)]'>
                                    <FaArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                        <div className='w-full h-[50px]'>
                            <Image
                                src={r_com_icon}
                                alt='orbital icon'
                                className='h-full w-auto object-contain object-left'
                            />
                        </div>
                        <ul className='w-full flex flex-row justify-start items-center flex-wrap space-x-2'>
                            <li className='py-2 px-5 cabinet-grotesk bg-[rgba(33,34,39,1)] rounded-full text-[rgba(255,255,255,0.5)] text-[12px]'>
                                <span>Multiple sectors</span>
                            </li>
                        </ul>
                        <div className='py-[20px] flex md:hidden flex-row justify-between items-center space-x-4'>
                            <button className='flex justify-center items-center rounded-full h-[50px] w-[50px] border-2 border-[rgba(255,255,255,0.2)] text-[rgba(255,255,255,0.2)] hover:text-[rgba(255,255,255,0.4)] hover:border-[rgba(255,255,255,0.4)]'>
                                <FaArrowLeft size={20} />
                            </button>
                            <button className='flex justify-center items-center rounded-full h-[50px] w-[50px] border-2 border-[rgba(255,255,255,0.2)] text-[rgba(255,255,255,0.2)] hover:text-[rgba(255,255,255,0.4)] hover:border-[rgba(255,255,255,0.4)]'>
                                <FaArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='-z-[40] w-full h-[150px] bg-custom-gradient-2 opacity-70'></div>
        </section>
    );
};

export default Reviews;
