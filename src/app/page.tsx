"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
    const router = useRouter();
    useEffect(() => {
        router.replace("/home");
    });
    return (
        <div className='bg-white text-black h-[100vh] w-[100vw] flex justify-center items-center overflow-hidden'>
            <span className="text-[18px]">Redirecting...</span>
        </div>
    );
};

export default Home;
