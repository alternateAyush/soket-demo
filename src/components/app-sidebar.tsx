"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
    getConfigArrayLength,
    getDefaultContext,
    getDefaultJsonData,
    setConfigs,
    setContext,
    setDefaultContext,
    setDefaultJsonData,
    setJsonData,
} from "@/utils/inputUtils";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
    const [contextInput, setContextInput] = useState("");
    const [jsonDataInput, setJsonDataInput] = useState("");
    const [configLength, setConfigLength] = useState(0);
    const [selectedConfig, setSelectedConfig] = useState(0);
    const [customize, setCustomize] = useState(false);
    useEffect(() => {
        setConfigLength(getConfigArrayLength());
    }, []);
    function handleContextDefault() {
        const dcontext = getDefaultContext();
        setContextInput(JSON.stringify(dcontext[0]));
        setDefaultContext();
    }
    function handleJsonDataDefault() {
        const djsonData = getDefaultJsonData();
        setJsonDataInput(JSON.stringify(djsonData));
        setDefaultJsonData();
    }
    function handleContextUpdate() {
        setContext(contextInput);
    }
    function handleJsonDataUpdate() {
        setJsonData(jsonDataInput);
    }
    function handleConfig(e, index) {
        setSelectedConfig(index+1);
        setConfigs(index);
    }
    function handleDefaultConfig(){
        setDefaultJsonData();
        setDefaultContext();
        setSelectedConfig(0);
    }
    return (
        <Sidebar side='left'>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Configure Inputs</SidebarGroupLabel>
                    <SidebarGroupContent className='flex flex-col p-2 space-y-4'>
                        <Button
                            className={`m-2 border-2 hover:bg-white hover:text-black ${
                                selectedConfig === 0
                                    ? `border-black bg-white text-black`
                                    : `border-transparent`
                            }`}
                            onClick={handleDefaultConfig}
                        >
                            Default Config
                        </Button>
                        <div className='w-full grid grid-cols-2'>
                            {Array.from(
                                { length: configLength },
                                (_, index) => (
                                    <Button
                                        key={index}
                                        onClick={(e) => {
                                            handleConfig(e, index);
                                        }}
                                        className={`m-2 border-2 hover:bg-white hover:text-black ${
                                            selectedConfig === (index+1)
                                                ? `border-black bg-white text-black`
                                                : `border-transparent`
                                        }`}
                                    >
                                        Config {index + 1}
                                    </Button>
                                )
                            )}
                        </div>
                        <Button
                            className='w-full'
                            onClick={() => {
                                setCustomize(!customize);
                            }}
                        >
                            {customize? `Hide Config`:`Customize Config`}
                        </Button>
                        <div
                            className={`${
                                customize ? `flex flex-col` : `hidden`
                            } w-full space-y-4`}
                        >
                            <div className='w-full flex flex-col space-y-2'>
                                <div className='grid w-full gap-1.5'>
                                    <Label htmlFor='jsonData'>Json Data</Label>
                                    <Textarea
                                        placeholder='{"key":"value"}'
                                        id='jsonData'
                                        value={jsonDataInput}
                                        onChange={(e) =>
                                            setJsonDataInput(e.target.value)
                                        }
                                        rows={8}
                                    />
                                </div>
                                <div className='w-full flex flex-row justify-center items-center space-x-2'>
                                    <Button onClick={handleJsonDataDefault}>
                                        Default
                                    </Button>
                                    <Button onClick={handleJsonDataUpdate}>
                                        Update
                                    </Button>
                                </div>
                            </div>
                            <div className='w-full flex flex-col space-y-2'>
                                <div className='grid w-full gap-1.5'>
                                    <Label htmlFor='context'>Context</Label>
                                    <Textarea
                                        placeholder='{"key":"value"}'
                                        id='context'
                                        value={contextInput}
                                        rows={8}
                                        onChange={(e) =>
                                            setContextInput(e.target.value)
                                        }
                                    />
                                </div>
                                <div className='w-full flex flex-row justify-center items-center space-x-2'>
                                    <Button onClick={handleContextDefault}>
                                        Default
                                    </Button>
                                    <Button onClick={handleContextUpdate}>
                                        Update
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
