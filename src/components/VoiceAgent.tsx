import React from "react";
import AudioSphere from "./AudioSphere";
import RealTimeAudioSphere from "@/components/RealTimeAudioSphere";
import { Vector3 } from "three";
type VoiceAgentProps = {
    styles?: string;
};

const VoiceAgent = ({ styles }: VoiceAgentProps) => {
    const position = new Vector3(0, 0, 0);

    return (
        <div className={`${styles}`}>
            <AudioSphere
                styles='w-full text-white'
                position={position}
                size={[1.8, 6]}
                height='350px'
            />
            {/* <RealTimeAudioSphere
                styles='w-full text-white'
                position={position}
                size={[1.8, 10]}
                height='350px'
            /> */}
        </div>
    );
};

export default VoiceAgent;
