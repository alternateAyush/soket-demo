"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Vector2, Vector3, Mesh, ShaderMaterial } from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Space_Mono } from "next/font/google";

//------------------------------------------------
const apiUrl: string = process.env.NEXT_PUBLIC_API_WSS || "";

import { RealtimeClient } from "@openai/realtime-api-beta";
import { WavRecorder, WavStreamPlayer } from "../lib/wavtools/index.js";
import { instructions } from "../utils/conversation_config";
//------------------------------------------------

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400"],
});

type AudioSphereProps = {
    styles?: string;
    position?: Vector3 | undefined;
    height?: string;
    size?:
        | [radius?: number | undefined, detail?: number | undefined]
        | undefined;
};

interface RealtimeEvent {
    time: string;
    source: "client" | "server";
    count?: number;
    event: { [key: string]: any };
}

function RealTimeAudioSphere({
    styles,
    position,
    size,
    height,
}: AudioSphereProps) {
    const vertexShader = `
    uniform float u_time;
    vec3 mod289(vec3 x)
    {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 mod289(vec4 x)
    {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 permute(vec4 x)
    {
        return mod289(((x*34.0)+10.0)*x);
    }

    vec4 taylorInvSqrt(vec4 r)
    {
            return 1.79284291400159 - 0.85373472095314 * r;
    }

    vec3 fade(vec3 t) {
        return t*t*t*(t*(t*6.0-15.0)+10.0);
    }
    // Classic Perlin noise, periodic variant
    float pnoise(vec3 P, vec3 rep)
    {
        vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
        vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
        Pi0 = mod289(Pi0);
        Pi1 = mod289(Pi1);
        vec3 Pf0 = fract(P); // Fractional part for interpolation
        vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;

        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);

        vec4 gx0 = ixy0 * (1.0 / 7.0);
        vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);

        vec4 gx1 = ixy1 * (1.0 / 7.0);
        vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);

        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;

        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);

        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
        return 2.2 * n_xyz;
    }
    uniform float u_frequency;
    void main(){
        float noise = 5.0*pnoise(position + u_time, vec3(10.0));
        float displacement = (u_frequency*noise)/1000.0;
        vec3 newPosition = position + normal*displacement;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition,1.0);
    }
`;
    const fragmentShader = `
    uniform float u_red;
    uniform float u_green;
    uniform float u_blue;
    void main(){
        gl_FragColor = vec4(vec3(u_red,u_green,u_blue),1.0);
    }
`;
    function Sphere() {
        const meshRef = useRef<Mesh | null>(null);
        const shaderMaterialRef = useRef<ShaderMaterial | null>(null);
        const zAxisRef = useRef(0.03);
        const uniforms = {
            u_resolution: {
                type: "v2",
                value: new Vector2(window.innerWidth, window.innerHeight),
            },
            u_time: {
                type: "f",
                value: 0.0,
            },
            u_frequency: {
                type: "f",
                value: 0.0,
            },
            u_red: {
                type: "f",
                value: 1,
            },
            u_green: {
                type: "f",
                value: 1,
            },
            u_blue: {
                type: "f",
                value: 1,
            },
        };
        const uniformRef = useRef(uniforms);
        useFrame((state) => {
            if (animateRef.current === true) {
                if (audioStateRef.current === "listen") {
                    meshRef.current!.position.z = 0;
                    uniformRef.current.u_frequency.value =
                        movingAverageRef.current * 500;
                    meshRef.current!.rotation.y -= 0.01;
                    uniformRef.current.u_red.value = 0.698;
                    uniformRef.current.u_green.value = 0.956;
                    uniformRef.current.u_blue.value = 0.98;
                } else if (audioStateRef.current === "speak") {
                    uniformRef.current.u_frequency.value =
                        movingAverageRef.current * 500;
                    meshRef.current!.rotation.y += 0.01;
                    //rgb(136,171,214)
                    uniformRef.current.u_blue.value = 1;
                    uniformRef.current.u_red.value = 0.43;
                    uniformRef.current.u_green.value = 0.67;
                }
            } else {
                const x = state.pointer.x;
                const y = state.pointer.y;
                meshRef.current!.rotation.x = x;
                meshRef.current!.rotation.y = y;
                meshRef.current!.rotation.z = x * y;
                // ref.current.position.z = -1 * Math.abs(x * y);
            }
        });
        return (
            <mesh position={position} ref={meshRef}>
                <icosahedronGeometry args={size} attach='geometry' />
                <shaderMaterial
                    ref={shaderMaterialRef}
                    uniforms={uniforms}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    wireframe
                />
            </mesh>
        );
    }
    function Scene() {
        return (
            <>
                <Sphere />
            </>
        );
    }

    // const [micDisable, setMicDisable] = useState(false);
    const animateRef = useRef(false);
    const audioStateRef = useRef("none");
    const movingAverageRef = useRef(0.0);
    const [bloom, setBloom] = useState([0.5, 0.5, 0.5]);
    const wavRecorderRef = useRef<WavRecorder>(
        new WavRecorder({ sampleRate: 8000 })
    );
    const wavStreamPlayerRef = useRef<WavStreamPlayer>(
        new WavStreamPlayer({ sampleRate: 8000 })
    );
    const clientRef = useRef<RealtimeClient>(
        new RealtimeClient({ url: apiUrl, apiKey: '' })
    );
    const clientActiveRef = useRef<Boolean>(false);
    const serverCanvasRef = useRef<HTMLCanvasElement>(null);
    const [isConnected, setIsConnected] = useState(false);
    // const [realtimeEvents, setRealtimeEvents] = useState<RealtimeEvent[]>([]);

    const [canPushToTalk, setCanPushToTalk] = useState(true);
    const [isRecording, setIsRecording] = useState(false);

    /**
     * Connect to conversation:
     * WavRecorder taks speech input, WavStreamPlayer output, client is API client
     */
    const connectConversation = useCallback(async () => {
        try {
            const client = clientRef.current;
            const wavRecorder = wavRecorderRef.current;
            const wavStreamPlayer = wavStreamPlayerRef.current;

            // Set state variables
            // startTimeRef.current = new Date().toISOString();
            setIsConnected(true);
            animateRef.current = true;
            audioStateRef.current = "speak";
            setBloom([1.0, 0.5, 0.5]);
            // setRealtimeEvents([]);
            // setItems(client.conversation.getItems());

            // Connect to microphone
            await wavRecorder.begin();

            // Connect to audio output
            await wavStreamPlayer.connect();

            // Connect to realtime API
            await client.connect();
            client.sendUserMessageContent([
                {
                    type: `input_text`,
                    text: `नमस्ते`,
                    // text: `For testing purposes, I want you to list ten car brands. Number each item, e.g. "one (or whatever number you are one): the item name".`
                },
            ]);

            if (client.getTurnDetectionType() === "server_vad") {
                await wavRecorder.record((data) =>
                    client.appendInputAudio(data.mono)
                );
            }
        } catch (error) {
            console.log("connectConversation function error:", error);
        }
    }, []);

    /**
     * Disconnect and reset conversation state
     */
    const disconnectConversation = useCallback(async () => {
        try {
            setIsConnected(false);
            animateRef.current = false;
            setBloom([0.5, 0.5, 0.5]);
            audioStateRef.current = "none";
            // setRealtimeEvents([]);
            // setItems([]);

            const client = clientRef.current;
            client.disconnect();

            const wavRecorder = wavRecorderRef.current;
            await wavRecorder.end();

            const wavStreamPlayer = wavStreamPlayerRef.current;
            await wavStreamPlayer.interrupt();
        } catch (error) {
            console.log("disconnectConversation function error:", error);
        }
    }, []);

    const deleteConversationItem = useCallback(async (id: string) => {
        const client = clientRef.current;
        client.deleteItem(id);
    }, []);

    /**
     * In push-to-talk mode, start recording
     * .appendInputAudio() for each sample
     */
    const startRecording = async () => {
        try {
            setIsRecording(true);
            clientActiveRef.current = true;
            audioStateRef.current = "listen";
            const client = clientRef.current;
            const wavRecorder = wavRecorderRef.current;
            const wavStreamPlayer = wavStreamPlayerRef.current;
            const trackSampleOffset = await wavStreamPlayer.interrupt();
            if (trackSampleOffset?.trackId) {
                const { trackId, offset } = trackSampleOffset;
                await client.cancelResponse(trackId, offset);
            }
            await wavRecorder.record((data) =>
                client.appendInputAudio(data.mono)
            );
        } catch (error) {
            console.log("startRecording function error", error);
        }
    };

    /**
     * In push-to-talk mode, stop recording
     */
    const stopRecording = async () => {
        try {
            setIsRecording(false);
            clientActiveRef.current = false;
            audioStateRef.current = "speak";
            const client = clientRef.current;
            const wavRecorder = wavRecorderRef.current;
            await wavRecorder.pause();
            client.createResponse();
        } catch (error) {
            console.log("stopRecording function error:", error);
        }
    };

    /**
     * Switch between Manual <> VAD mode for communication
     */
    const changeTurnEndType = async (value: string) => {
        try {
            const client = clientRef.current;
            const wavRecorder = wavRecorderRef.current;
            if (value === "none" && wavRecorder.getStatus() === "recording") {
                await wavRecorder.pause();
            }
            client.updateSession({
                turn_detection:
                    value === "none" ? null : { type: "server_vad" },
            });
            if (value === "server_vad" && client.isConnected()) {
                await wavRecorder.record((data) =>
                    client.appendInputAudio(data.mono)
                );
            }
            setCanPushToTalk(value === "none");
        } catch (error) {
            console.log("changeTurnEndType function error", error);
        }
    };

    useEffect(() => {
        let isLoaded = true;
        const wavRecorder = wavRecorderRef.current;
        const wavStreamPlayer = wavStreamPlayerRef.current;

        const render = () => {
            if (isLoaded) {
                if (clientActiveRef.current===true) {
                    console.log("hello");
                    const result = wavRecorder.recording
                        ? wavRecorder.getFrequencies("voice")
                        : { values: new Float32Array([0]) };
                    let sum = 0;
                    const dataArray = result.values;
                    const alpha = 1.0;
                    for (let i = 0; i < dataArray.length; i++) {
                        sum += Math.abs(dataArray[i]);
                    }
                    const average = sum / dataArray.length;
                    movingAverageRef.current = average;
                    // (alpha * average + (1 - alpha) * movingAverageRef.current) / 50;
                    console.log("moving avg rec: ", movingAverageRef.current);
                } else if (wavStreamPlayer.analyser) {
                    const result = wavStreamPlayer.analyser
                        ? wavStreamPlayer.getFrequencies("voice")
                        : { values: new Float32Array([0]) };
                    let sum = 0;
                    const dataArray = result.values;
                    for (let i = 0; i < dataArray.length; i++) {
                        sum += Math.abs(dataArray[i]);
                    }
                    const average = sum / dataArray.length;
                    movingAverageRef.current = average;
                    // (alpha * average + (1 - alpha) * movingAverageRef.current) / 50;
                    console.log("moving avg: ", movingAverageRef.current);
                }
            } else {
                movingAverageRef.current = 0;
            }
            window.requestAnimationFrame(render);
        };
        render();
        return () => {
            isLoaded = false;
        };
    }, []);

    useEffect(() => {
        // Get refs
        const wavStreamPlayer = wavStreamPlayerRef.current;
        const client = clientRef.current;

        // Set instructions
        client.updateSession({ instructions: instructions });
        // Set transcription, otherwise we don't get user transcriptions back
        client.updateSession({
            input_audio_transcription: { model: "whisper-1" },
        });

        // handle realtime events from client + server for event logging
        // client.on("realtime.event", (realtimeEvent: RealtimeEvent) => {
        //     setRealtimeEvents((realtimeEvents) => {
        //         const lastEvent = realtimeEvents[realtimeEvents.length - 1];
        //         if (lastEvent?.event.type === realtimeEvent.event.type) {
        //             // if we receive multiple events in a row, aggregate them for display purposes
        //             lastEvent.count = (lastEvent.count || 0) + 1;
        //             return realtimeEvents.slice(0, -1).concat(lastEvent);
        //         } else {
        //             return realtimeEvents.concat(realtimeEvent);
        //         }
        //     });
        // });
        client.on("error", (event: any) => console.error(event));
        client.on("conversation.interrupted", async () => {
            const trackSampleOffset = await wavStreamPlayer.interrupt();
            if (trackSampleOffset?.trackId) {
                const { trackId, offset } = trackSampleOffset;
                await client.cancelResponse(trackId, offset);
            }
        });
        client.on("conversation.updated", async ({ item, delta }: any) => {
            // const items = client.conversation.getItems();
            if (delta?.audio) {
                wavStreamPlayer.add16BitPCM(delta.audio, item.id);
            }
            if (item.status === "completed" && item.formatted.audio?.length) {
                const wavFile = await WavRecorder.decode(
                    item.formatted.audio,
                    8000,
                    8000
                );
                item.formatted.file = wavFile;
            }
        });

        return () => {
            // cleanup; resets to defaults
            client.reset();
        };
    }, []);
    return (
        <div
            className={`${styles} agent-container flex-col justify-start items-center space-y-4 h-auto border rounded-[45px] p-[20px]`}
        >
            <div
                className={`agent-canvas-container ${
                    audioStateRef.current !== "none"
                        ? "agent-canvas-container-listening"
                        : ""
                } relative h-[${height}] w-full rounded-[25px]`}
            >
                <Canvas>
                    <Scene />
                    <EffectComposer>
                        <Bloom
                            intensity={bloom[0]} // Control bloom intensity
                            luminanceThreshold={bloom[1]} // Adjust threshold to control what gets bloomed
                            luminanceSmoothing={bloom[2]} // Smooth out luminance transition
                        />
                    </EffectComposer>
                </Canvas>
                <div
                    className={`${spaceMono.className} text-[12px] z-10 agent-tag flex justify-center items-center absolute top-3 left-3 rounded-full px-[10px]`}
                >
                    <span>Demo</span>
                </div>
            </div>
            <div className='flex flex-col md:flex-row justify-start items-stretch md:justify-evenly md:items-center p-2 space-y-4 md:space-y-0'>
                <button
                    onClick={
                        isConnected
                            ? disconnectConversation
                            : connectConversation
                    }
                    className={`${
                        isConnected
                            ? `text-black bg-white border-black`
                            : `text-white bg-black border-white`
                    } py-2 px-[20px] capitalize text-[16px] border border-white rounded-md`}
                >
                    {isConnected ? "disconnect" : "connect"}
                </button>
                <button
                    className={`${
                        isRecording
                            ? `text-black bg-white border-black`
                            : `text-white bg-black border-white`
                    } py-2 px-[20px] capitalize text-[16px] border border-white rounded-md`}
                    disabled={!isConnected || !canPushToTalk}
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                >
                    {isRecording ? "release to send" : "push to talk"}
                </button>
            </div>
        </div>
    );
}

export default RealTimeAudioSphere;
