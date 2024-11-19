"use client";
import React from "react";
import RealTimeAgent from "@/components/RealTimeAgent";
import { Vector3 } from "three";
import WebCamComponent from "@/components/WebCamComponent";

const AgentPage = () => {
    const position = new Vector3(0, 0, 0);
    return (
        <div className='w-full h-[100vh] overflow-hidden flex flex-row items-stretch m-0'>
            <div className='w-[50%] h-full flex flex-col justify-center items-center bg-black'>
                <WebCamComponent />
            </div>
            <div className='w-[50%] h-full bg-black'>
                <RealTimeAgent position={position} size={[2.5, 15]} />
            </div>
        </div>
    );
};

export default AgentPage;
