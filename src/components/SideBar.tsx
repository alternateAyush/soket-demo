"use client";
import React from "react";
import { IoHome,IoInformation, IoMenu,IoMail} from "react-icons/io5";

const SideBar = () => {
  return (
    <div className='z-50 absolute right-0 top-0 overflow-hidden h-[100vh] text-white opacity-0 hover:opacity-100'>
      <div className='h-[100vh] flex flex-col justify-center items-center'>
        <div className='m-1 p-2 rounded-lg flex flex-col justify-center items-center space-y-3 bg-gradient-to-bl from-[rgba(255,255,255,0.5)] to-[rgba(0,0,0,1)]'>
          <button className='p-2 hover:text-[rgba(0,0,0,0.6)] hover:bg-[rgba(255,255,255,0.6)] rounded-full'>
            <IoHome size={20} />
          </button>
          <button className='p-2 hover:text-[rgba(0,0,0,0.6)] hover:bg-[rgba(255,255,255,0.6)] rounded-full'>
            <IoMenu size={20} />
          </button>
          <button className='p-2 hover:text-[rgba(0,0,0,0.6)] hover:bg-[rgba(255,255,255,0.6)] rounded-full'>
            <IoInformation size={20} />
          </button>
          <button className='p-2 hover:text-[rgba(0,0,0,0.6)] hover:bg-[rgba(255,255,255,0.6)] rounded-full'>
            <IoMail size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
