"use client";
import React from "react";
import { IoPersonOutline, IoMailOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";

type props = {
    id: string | null;
    person: { fullName: string; email: string; website: string | null };
    setPerson: React.Dispatch<
        React.SetStateAction<{
            fullName: string;
            email: string;
            website: string | null;
        }>
    >;
};

const FormInput = ({ id, person, setPerson }: props) => {
    const handleChange = function (e: any) {
        if (id === "fullName") {
            setPerson({ ...person, fullName: e.target.value });
        } else if (id === "email") {
            setPerson({ ...person, email: e.target.value });
        } else if (id === "website") {
            setPerson({ ...person, website: e.target.value });
        }
        console.log(e);
    };
    return (
        <div className='px-4 h-[50px] flex flex-row space-x-4 justify-start items-center w-full rounded-full bg-[rgba(30,31,36,1)] border border-[rgba(255,255,255,0.3)]'>
            {id === "fullName" ? (
                <IoPersonOutline size={18} color="rgba(255,255,255,0.7)"/>
            ) : id === "email" ? (
                <IoMailOutline size={18} color="rgba(255,255,255,0.7)"/>
            ) : id === "website" ? (
                <IoIosLink size={18} color="rgba(255,255,255,0.7)"/>
            ) : (
                <IoPersonOutline size={18} color="rgba(255,255,255,0.7)"/>
            )}
            <input
                className={`text-white text-[14px] bg-transparent outline-none w-full`}
                value={
                    id === "fullName"
                        ? person.fullName
                        : id === "email"
                        ? person.email
                        : id === "website"
                        ? person.website
                        : ""
                }
                type={
                    id === "fullName"
                        ? "text"
                        : id === "email"
                        ? "email"
                        : id === "website"
                        ? person.website
                        : "url"
                }
                onChange={handleChange}
                placeholder={`Enter your ${
                    id === "fullName"
                        ? `full name`
                        : id === "email"
                        ? `email here`
                        : id === "website"
                        ? `company's website URL`
                        : ""
                }`}
                required={id === "fullName" || id === "email" ? true : false}
            />
        </div>
    );
};

export default FormInput;
