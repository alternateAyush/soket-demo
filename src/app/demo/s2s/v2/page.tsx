"use client";

import React from "react";
import RealTimeAudioSphere from "@/components/RealTimeAudioSphere";
import { Vector3 } from "three";

const Audio3dPage2 = () => {
    const position = new Vector3(0, 0, 0);
    return (
        <div className='h-[100vh] w-[100vw] m-0 px-[20px] md:p-0 bg-black flex flex-col justify-start items-center py-2 overflow-hidden'>
            <h1 className='text-white font-bold tracking-[5px] text-lg mb-2'>
                S2S Demo
            </h1>
            <RealTimeAudioSphere
                styles='w-full md:w-1/2 text-white'
                position={position}
                size={[2.0, 15]}
                height='350px'
            />
        </div>
    );
};

export default Audio3dPage2;
