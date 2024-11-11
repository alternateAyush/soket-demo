import React from "react";
import AudioSphere from "./AudioSphere";
import { Vector3 } from "three";
import { Space_Mono } from "next/font/google";
const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400"],
});

type VoiceAgentProps = {
    styles?: string;
};

const VoiceAgent = ({ styles}:VoiceAgentProps) => {
    const position = new Vector3(0, 0, 0);

    return (
        <div
            className={`${styles} agent-container flex-col justify-start items-center space-y-3 h-auto border rounded-[45px] p-[20px]`}
        >
            <div className='relative agent-canvas-container h-[350px] w-full rounded-[25px]'>
                <AudioSphere
                    styles='bg-transparent h-full w-full'
                    position={position}
                    size={[2.0, 8]}
                />
                <div
                    className={`${spaceMono.className} text-[12px] z-10 agent-tag flex justify-center items-center absolute top-3 left-3 rounded-full px-[10px]`}
                >
                    <span>Demo</span>
                </div>
            </div>
            <div className='agent-button-container w-full md:w-[75%] flex flex-row justify-between items-center rounded-[55px] p-[10px]'>
                <span
                    className={`${spaceMono.className} uppercase text-[12px] ml-[10px] text-nowrap text-ellipsis overflow-hidden`}
                >
                    tap here to start talking
                </span>
                <button className='agent-button h-[40px] w-[40px] rounded-full flex items-center justify-center'>
                    <svg
                        className='w-6 h-6 text-white'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        width='22'
                        height='22'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path
                            fill-rule='evenodd'
                            d='M5 8a1 1 0 0 1 1 1v3a4.006 4.006 0 0 0 4 4h4a4.006 4.006 0 0 0 4-4V9a1 1 0 1 1 2 0v3.001A6.006 6.006 0 0 1 14.001 18H13v2h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-2H9.999A6.006 6.006 0 0 1 4 12.001V9a1 1 0 0 1 1-1Z'
                            clip-rule='evenodd'
                        />
                        <path d='M7 6a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4V6Z' />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default VoiceAgent;
