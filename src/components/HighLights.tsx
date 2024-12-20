"use client";
import React, { useState, useEffect } from "react";
import { Space_Mono } from "next/font/google";
import Image from "next/image";
import hightlight_01 from "../../public/images/highlight_01.png";
import hightlight_02 from "../../public/images/highlight_02.png";
import hightlight_03 from "../../public/images/highlight_03.png";
import { type CarouselApi } from "@/components/ui/carousel";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400"],
});

const sectionName = "highlights";
const sectionTitle =
    "Seamless Global Communication with Real-Time Multilingual Speech Solutions";
const highlightList = [
    {
        title: "Real-Time Multilingual Translation",
        imgPath: hightlight_01,
        para: "Effortlessly translate spoken words across multiple languages for smooth cross-border communication.",
    },
    {
        title: "Automatic Speech Recognition (ASR)",
        imgPath: hightlight_02,
        para: "Get instant transcriptions of business calls and interactions, enhancing efficiency and decision-making.",
    },
    {
        title: "Speech-to-Speech Translation",
        imgPath: hightlight_03,
        para: "Enable conversations between speakers of different languages, ideal for customer support/international collaboration.",
    },
];

const HighLights = () => {
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
    return (
        <section className='pt-[70px] md:pt-[100px] pb-0 mt-[-20px] relative rounded-t-[22px] text-black z-0 bg-white w-[100vw] h-auto min-h-[100vh] overflow-hidden'>
            <div className='flex flex-col justify-start items-start space-y-[30px] px-[20px] md:px-0 w-full md:w-[1150px] mx-auto'>
                <span
                    className={`${spaceMono.className} uppercase text-black text-[14px] text-nowrap`}
                >
                    {"// "}
                    {sectionName}
                </span>
                <h2 className='w-full md:w-[75%] text-[2.5rem] md:text-[3rem] leading-[2.6rem] md:leading-[3.1rem] cabinet-grotesk break-words'>
                    {sectionTitle}
                </h2>
            </div>
            <div className='hidden md:block w-[100vw] mt-[40px] border-t border-[rgba(0,0,0,0.3)] cabinet-grotesk-medium'>
                <div className='w-full md:w-[1150px] mx-auto grid grid-cols-1 md:grid-cols-3'>
                    {highlightList.map((highlight, index) => {
                        return (
                            <div
                                key={index}
                                className={`${
                                    (index + 1) % 3 == 0
                                        ? `border-transparent`
                                        : `border-[rgba(0,0,0,0.3)]`
                                } border-b md:border-b-0 md:border-r flex flex-col justify-start items-start space-y-6 p-[20px] md:pb-[120px]`}
                            >
                                <span className='w-full text-right text-[16px] text-[rgba(0,0,0,0.4)]'>
                                    0{index + 1}
                                </span>
                                <div className='h-[350px] flex flex-row justify-center items-center mx-auto relative overflow-hidden'>
                                    <Image
                                        className='h-full w-auto object-contain object-center'
                                        src={highlight.imgPath}
                                        alt={highlight.title}
                                    />
                                </div>
                                <div className='w-full flex flex-col justify-start items-start space-y-3'>
                                    <h3 className='w-full text-black text-[1.8rem]'>
                                        {highlight.title}
                                    </h3>
                                    <p className='w-full text-[14px] text-[rgba(0,0,0,0.4)]'>
                                        {highlight.para}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Carousel
                setApi={setApi}
                className='md:hidden relative w-full mt-[40px] border-t border-[rgba(0,0,0,0.3)] cabinet-grotesk-medium'
            >
                <CarouselContent className={`w-full`}>
                    {highlightList.map((highlight, index) => {
                        return (
                            <CarouselItem
                                key={index}
                                className={`${
                                    (index + 1) % 3 == 0
                                        ? `border-transparent`
                                        : `border-[rgba(0,0,0,0.3)]`
                                } basis-[90%] border-r flex flex-col justify-start items-start space-y-6 ml-[20px] py-[20px] pr-[20px] pb-[120px]`}
                            >
                                <span className='w-full text-right text-[16px] text-[rgba(0,0,0,0.4)]'>
                                    0{index + 1}
                                </span>
                                <div className='h-[350px] flex flex-row justify-center items-center mx-auto relative overflow-hidden'>
                                    <Image
                                        className='h-full w-auto object-contain object-center'
                                        src={highlight.imgPath}
                                        alt={highlight.title}
                                    />
                                </div>
                                <div className='w-full flex flex-col justify-start items-start space-y-3'>
                                    <h3 className='w-full text-black text-[1.8rem]'>
                                        {highlight.title}
                                    </h3>
                                    <p className='w-full text-[14px] text-[rgba(0,0,0,0.4)]'>
                                        {highlight.para}
                                    </p>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <div className='z-10 w-[200px] h-[5px] absolute bottom-[80px] left-[20px] flex flex-row justify-between items-center space-x-1 flex-nowrap '>
                    {highlightList.map((item, index) => {
                        return (
                            <div
                                className={`${(current==index+1)? 'w-full bg-black':'w-1/3 bg-[rgba(217,217,217,1)]'} scroll-indicator h-full rounded-sm`}
                                key={index}
                            ></div>
                        );
                    })}
                </div>
            </Carousel>
        </section>
    );
};

export default HighLights;
