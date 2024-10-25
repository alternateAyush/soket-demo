import React from "react";
import Image from "next/image";
import Link from "next/link";
import icon from "../../public/images/icon_01.png";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";

const sectionName = "footer";

const linkList = [
    { title: "Sign in", url: "/home#footer" },
    { title: "Documentation", url: "/home#footer" },
];
const infoList = [
    { title: "Features", url: "/home#features" },
    { title: "Demos", url: "/home/demo" },
    { title: "Industries", url: "/home#industries" },
    { title: "Workflows", url: "/home#footer" },
];
const soketLabList = [
    { title: "About", url: "/home#about" },
    { title: "Purpose", url: "/home#footer" },
    { title: "Products", url: "/home#industries" },
    { title: "Website", url: "/home#nav" },
];
const iconSize = 14;
const socialIconList = [
    {
        url: "/home#footer",
        icon: <FaFacebookF size={iconSize} />,
    },
    {
        url: "/home#footer",
        icon: <FaXTwitter size={iconSize} />,
    },
    {
        url: "/home#footer",
        icon: <AiFillInstagram size={iconSize} />,
    },
    {
        url: "/home#footer",
        icon: <FaLinkedinIn size={iconSize} />,
    },
];

const Footer = () => {
    return (
        <footer
            id={sectionName}
            className='cabinet-grotesk-medium pt-[70px] md:pt-[100px] mt-[-20px] relative rounded-t-3xl text-white z-0 bg-black w-[100vw] h-auto overflow-hidden'
        >
            <div className='px-[20px] md:px-0 mx-auto w-full md:w-[1150px] flex flex-col md:flex-row justify-between items-center space-y-[50px] md:space-y-0 md:items-start'>
                <div className='w-[120px]'>
                    <Image
                        src={icon}
                        alt='speech-to-speech icon'
                        className='w-full object-contain object-left'
                    />
                </div>
                <div className='flex flex-row w-full md:w-1/2 justify-between md:justify-start md:space-x-[120px] items-start flex-wrap'>
                    <div className='flex flex-col justify-start items-start space-y-6'>
                        <h4 className='uppercase text-[14px]'>{`links`}</h4>
                        <ul className='flex flex-col justify-start items-start space-y-3'>
                            {linkList.map((link, index) => {
                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className='text-[rgba(255,255,255,0.5)] hover:text-white'
                                    >
                                        <span className='text-[14px]'>
                                            {link.title}
                                        </span>
                                    </Link>
                                );
                            })}
                        </ul>
                    </div>
                    <div className='flex flex-col justify-start items-start space-y-6'>
                        <h4 className='uppercase text-[14px]'>{`info`}</h4>
                        <ul className='flex flex-col justify-start items-start space-y-3'>
                            {infoList.map((link, index) => {
                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className='text-[rgba(255,255,255,0.5)] hover:text-white'
                                    >
                                        <span className='text-[14px] text-[rgba(255,255,255,0.5)]'>
                                            {link.title}
                                        </span>
                                    </Link>
                                );
                            })}
                        </ul>
                    </div>
                    <div className='flex flex-col justify-start items-start space-y-6'>
                        <h4 className='uppercase text-[14px]'>{`soket labs`}</h4>
                        <ul className='flex flex-col justify-start items-start space-y-3'>
                            {soketLabList.map((link, index) => {
                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className='text-[rgba(255,255,255,0.5)] hover:text-white'
                                    >
                                        <span className='text-[14px] text-[rgba(255,255,255,0.5)]'>
                                            {link.title}
                                        </span>
                                    </Link>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='mt-[150px] py-[70px] border-t border-[rgba(212,218,255,0.15)] w-full'>
                <div className='px-[20px] md:px-0 mx-auto w-full md:w-[1150px] flex flex-col space-y-6 md:space-y-0  md:flex-row justify-between items-center'>
                    <div className='flex flex-row justify-start items-center space-x-6 text-[14px] text-[rgba(255,255,255,0.7)]'>
                        <Link href='home#footer' className='hover:text-white'>
                            <span>Privacy Notice</span>
                        </Link>
                        <Link href='home#footer' className='hover:text-white'>
                            <span>Terms of Service</span>
                        </Link>
                        <Link href='home#footer' className='hover:text-white'>
                            <span>Status</span>
                        </Link>
                    </div>
                    <ul className='flex flex-row justify-end items-center space-x-4'>
                        {socialIconList.map((icon, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={icon.url}
                                    className='p-[10px] rounded-full text-white bg-[rgba(19,21,34,1)] border border-[rgba(212,218,255,0.18)]  hover:text-black hover:bg-white'
                                >
                                    {icon.icon}
                                </Link>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
