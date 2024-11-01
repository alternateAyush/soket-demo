"use client";
import React from "react";
import { IoPersonOutline, IoMailOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";

type props = {
    id: string | null;
    person: { name: string; email: string; website: string | null };
    setPerson: React.Dispatch<
        React.SetStateAction<{
            name: string;
            email: string;
            website: string;
        }>
    >;
};

const FormInput = ({ id, person, setPerson }: props) => {
    const handleChange = function (e:React.ChangeEvent<HTMLInputElement>) {
        if (id === "name") {
            setPerson({ ...person, name: e.target.value });
        } else if (id === "email") {
            setPerson({ ...person, email: e.target.value });
        } else if (id === "website") {
            setPerson({ ...person, website: e.target.value });
        }
    };
    return (
        <div className='px-4 h-[50px] flex flex-row space-x-4 justify-start items-center w-full rounded-full bg-[rgba(30,31,36,1)] border border-[rgba(255,255,255,0.3)]'>
            {id === "name" ? (
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
                    id === "name"
                        ? person.name
                        : id === "email"
                        ? person.email
                        : id === "website"
                        ? person.website
                        : ""
                }
                type={
                    id === "name"
                        ? "text"
                        : id === "email"
                        ? "email"
                        : id === "website"
                        ? person.website
                        : "url"
                }
                onChange={handleChange}
                placeholder={`Enter your ${
                    id === "name"
                        ? `full name`
                        : id === "email"
                        ? `email here`
                        : id === "website"
                        ? `company's website URL`
                        : ""
                }`}
                required
            />
        </div>
    );
};

export default FormInput;
