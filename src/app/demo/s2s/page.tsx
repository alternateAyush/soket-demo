"use client";

import React from "react";
import AudioSphere from "@/components/AudioSphere";
import { Vector3 } from "three";

const Audio3dPage = () => {
    const keey = process.env.NEXT_PUBLIC_TOKEN;
    const position = new Vector3(0,0,0);
    console.log(keey);
  return (
    <div className='h-[100vh] bg-black flex flex-col justify-start items-center py-2 overflow-hidden'>
      <h1 className='text-white font-bold tracking-[5px] text-lg'>S2S Demo</h1>
      <AudioSphere
        styles='bg-black h-4/5 w-[100vw]'
        position={position}
        size={[1.7, 10]}
      />
    </div>
  );
};

export default Audio3dPage;
