"use client";
import React, { useState, useEffect } from "react";
import { Space_Mono } from "next/font/google";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400"],
});

const sectionName = "usecases";
const sectionTitle = "Try out the API in Real-Time";
const demoVideostList = [
    { title: "Banking", description: "", imgUrl: "", videoUrl: "" },
    { title: "Financial Services", description: "", imgUrl: "", videoUrl: "" },
    {
        title: "Insurance (BFSI)",
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
    { title: "Edtech", description: "", imgUrl: "", videoUrl: "" },
];

const DemoVideos = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const handleClick = function (btn: string) {
        console.log(btn, "clicked");
    };
    return (
        <section
            id={sectionName}
            className='pt-[70px] md:pt-[100px] pb-[120px] mt-[-20px] relative rounded-t-[22px] text-black z-0 bg-white w-[100vw] h-auto min-h-[100vh] overflow-hidden'
        >
            <div className='flex flex-col justify-start items-start space-y-[30px] px-[20px] md:px-0 w-full md:w-[1150px] mx-auto'>
                <span
                    className={`${spaceMono.className} uppercase text-black text-[14px] text-nowrap`}
                >
                    {"// "}
                    {`api demo`}
                </span>
                <div className='w-full flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0'>
                    <h2 className='w-full md:w-[50%] text-[2.5rem] md:text-[3rem] leading-[2.6rem] md:leading-[3.1rem] cabinet-grotesk break-words'>
                        {sectionTitle}
                    </h2>
                </div>
                <div className='cabinet-grotesk flex flex-col justify-start items-center w-full bg-transparent md:bg-[rgba(249,249,249,1)] md:border border-[rgba(0,0,0,0.14)] rounded-[18px] md:px-[10px] md:py-[20px]'>
                    <div className='w-full flex flex-row justify-start md:justify-between items-center space-x-2 space-y-2 md:space-y-0 flex-wrap'>
                        {demoVideostList.map((demoVideo, index) => {
                            return (
                                <button
                                    key={index}
                                    onClick={() => {
                                        api.scrollTo(index);
                                    }}
                                    className={`${
                                        current === index + 1
                                            ? "bg-white text-black border-black"
                                            : "bg-[rgba(240,240,240,1)] text-[rgba(144,144,144,1)] border-transparent"
                                    } border px-[30px] py-[10px] text-[1.125rem] rounded-full`}
                                >
                                    <span>{demoVideo.title}</span>
                                </button>
                            );
                        })}
                    </div>
                    <div className='w-full hr-style mt-[20px] mb-[40px]'></div>
                    <Carousel
                        className='w-full relative flex flex-col justify-center items-stretch space-y-[20px]'
                        opts={{ loop: true }}
                        setApi={setApi}
                    >
                        <CarouselContent className='w-full'>
                            {demoVideostList.map((demoVideo, index) => {
                                return (
                                    <CarouselItem
                                        key={index}
                                        className='basis-[100%] box-border'
                                    >
                                        <div className='bg-black text-white rounded-[18px] w-full h-[450px] box-border p-2 ml-2 flex justify-center items-center'>
                                            <span>{"Coming Soon...."}</span>
                                        </div>
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                        {/* <CarouselPrevious className='absolute top-1/2 left-2 hidden md:flex' /> */}
                        {/* <CarouselNext className='absolute top-1/2 right-2 hidden md:flex' /> */}
                        <button className='hidden md:flex absolute top-[40%] left-2 overflow-hidden w-[50px] h-[50px] bg-white rounded-full border border-black text-black justify-center items-center'>
                            <IoIosArrowRoundBack size={25} onClick={()=>{api.scrollPrev()}}/>
                        </button>
                        <button className='hidden md:flex absolute top-[40%] right-2 overflow-hidden w-[50px] h-[50px] bg-white rounded-full border border-black text-black justify-center items-center'>
                            <IoIosArrowRoundForward size={25} onClick={()=>{api.scrollNext()}}/>
                        </button>
                    </Carousel>
                    <div className='w-full mt-[20px] flex flex-row justify-between items-center md:hidden'>
                        <button className='overflow-hidden w-[60px] h-[60px] bg-white rounded-full border border-black text-black flex justify-center items-center'>
                            <IoIosArrowRoundBack size={30} onClick={()=>{api.scrollPrev()}}/>
                        </button>
                        <button className='overflow-hidden w-[60px] h-[60px] bg-white rounded-full border border-black text-black flex justify-center items-center'>
                            <IoIosArrowRoundForward size={30} onClick={()=>{api.scrollNext()}}/>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DemoVideos;
