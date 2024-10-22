"use client";

import React, { useRef, useState } from "react";
import axios from "axios";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { Canvas, useFrame } from "@react-three/fiber";
import WavEncoder from "wav-encoder";
import { Vector2, Vector3, Mesh, ShaderMaterial } from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { getContext, getJsonData } from "@/utils/inputUtils";

type AudioSphereProps = {
    styles?: string;
    position?: Vector3 | undefined;
    size?:
        | [radius?: number | undefined, detail?: number | undefined]
        | undefined;
};

function AudioSphere({ styles, position, size }: AudioSphereProps) {
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
    const audioWorkletModuleBlob = new Blob(
        [
            `
  class AudioProcessor extends AudioWorkletProcessor {
    constructor() {
      super();
      this.movingAverage = 0.0;
      this.alpha = 0.1;
    }
    process(inputs, outputs, parameters) {
      const input = inputs[0];
      if (input.length > 0) {
        const inputData = input[0];
        const sum = inputData.reduce((acc, val) => acc + Math.abs(val), 0);
        const average = sum / inputData.length;
        this.movingAverage = this.alpha * average + (1 - this.alpha) * this.movingAverage;
        this.port.postMessage(this.movingAverage);
      }
      return true;
    }
  }
  registerProcessor('audio-processor', AudioProcessor);
`,
        ],
        { type: "application/javascript" }
    );
    function Sphere() {
        const meshRef = useRef<Mesh | null>(null);
        const shaderMaterialRef = useRef<ShaderMaterial | null>(null);
        const zAxisRef = useRef(0.04);
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
                        movingAverageRef.current * 2050;
                    meshRef.current!.rotation.y -= 0.01;
                    uniformRef.current.u_green.value = 0.6;
                    uniformRef.current.u_blue.value = 0.4;
                    uniformRef.current.u_red.value = 0.4;
                } else if (audioStateRef.current === "wait") {
                    uniformRef.current.u_frequency.value = 0.0;
                    meshRef.current!.position.z += zAxisRef.current;
                    if (
                        meshRef.current!.position.z < -1.15 ||
                        meshRef.current!.position.z > 1.05
                    ) {
                        zAxisRef.current *= -1;
                    }
                    uniformRef.current.u_blue.value = 0.7;
                    uniformRef.current.u_red.value = 0.4;
                    uniformRef.current.u_green.value = 0.4;
                } else if (audioStateRef.current === "speak") {
                    meshRef.current!.position.z = 0;
                    uniformRef.current.u_frequency.value =
                        movingAverageRef.current * 2150;
                    meshRef.current!.rotation.y += 0.01;
                    uniformRef.current.u_red.value = 0.9;
                    uniformRef.current.u_blue.value = 0.3;
                    uniformRef.current.u_green.value = 0.3;
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

    const [isRecording, setIsRecording] = useState(false);
    const [micDisable, setMicDisable] = useState(false);
    const animateRef = useRef(false);
    const audioStateRef = useRef("none");
    const audioProcessorRef = useRef<AudioWorkletNode | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const audioStreamRef = useRef<MediaStream | null>(null);
    const recordedChunksRef = useRef<Blob[]>([]);
    const movingAverageRef = useRef(0.0);
    const [bloom, setBloom] = useState([0.7, 0.5, 0.5]);

    async function setUpAudioRecording() {
        try {
            audioStreamRef!.current = await navigator.mediaDevices.getUserMedia(
                {
                    audio: {
                        sampleRate: 16000,
                        channelCount: 1,
                    },
                }
            );
            const audioContextOne = new AudioContext();
            mediaRecorderRef.current = new MediaRecorder(
                audioStreamRef.current
            );
            mediaRecorderRef.current.onstart = () => {
                setIsRecording(true);
                audioStateRef.current = "listen";
                animateRef.current = true;
                setBloom([4, 0.2, 0.2]);
                recordedChunksRef.current = [];
            };
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunksRef.current.push(event.data);
                }
            };
            mediaRecorderRef.current.onstop = async () => {
                movingAverageRef.current = 0.0;
                setIsRecording(false);
                audioStateRef.current = "wait";
                setMicDisable(true);
                const audioBlob = new Blob(recordedChunksRef.current, {
                    type: "audio/webm",
                });
                // ----------------to check audio --------------------------------
                // const audioUrl = window.URL.createObjectURL(audioBlob);
                // setAudioSrc(audioUrl);
                // -------------------------------------------------
                const arrayBuffer = await audioBlob.arrayBuffer();
                const audioContext = new AudioContext();

                // Decode the audio data from the recorded Blob
                await audioContextOne.close();
                await audioContext
                    .decodeAudioData(arrayBuffer)
                    .then((audioBuffer) => {
                        const wavData = {
                            sampleRate: 16000, // Output in 16kHz
                            channelData: [audioBuffer.getChannelData(0)], // Single-channel (mono) data
                        };

                        // Encode the PCM data into a WAV file using wav-encoder
                        WavEncoder.encode(wavData).then(
                            async (wavArrayBuffer) => {
                                const wavBlob = await new Blob(
                                    [wavArrayBuffer],
                                    {
                                        type: "audio/wav",
                                    }
                                );
                                console.log("wave blob:", wavBlob);
                                await sendAudioData(wavBlob);
                            }
                        );
                    });
                await audioContext.close();
            };

            await audioContextOne.audioWorklet.addModule(
                URL.createObjectURL(audioWorkletModuleBlob)
            );

            audioSourceRef.current = audioContextOne.createMediaStreamSource(
                audioStreamRef.current
            );
            audioProcessorRef.current = new AudioWorkletNode(
                audioContextOne,
                "audio-processor"
            );
            return audioContextOne;
        } catch (error) {
            console.log("audio setup failed:", error);
        }
    }
    //----------------------------------------------------------------
    function arrayBufferToBase64(buffer: ArrayBuffer) {
        const bytes = new Uint8Array(buffer);
        let binary = "";
        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary); // Base64 encode the binary string
    }
    function base64ToBlob(base64: string, mimeType: string) {
        const byteCharacters = atob(base64); // Decode the base64 string
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    }
    // -----------------------------------------------------------------
    async function fetchAudioResponse(audioBlob: Blob) {
        try {
            const arrayBuffer = await audioBlob.arrayBuffer();
            const base64Audio = arrayBufferToBase64(arrayBuffer);
            const jsData = getJsonData();
            const history = getContext();
            console.log(jsData);
            console.log(history);

            // const history = [
            //     {
            //         role: "user",
            //         content: "विषय: मर्न स्टैक वेब विकास",
            //     },
            // ];
            // const jsonData = {
            //     audio_base64: base64Audio,
            //     language: "hi",
            //     action: "s2s_llm",
            //     voice: "male",
            //     context_history: history,
            //     input: "आप हिन्दी के अनुभवी प्रोफेसर हैं। आपको हिंदी निबंध लेखन के लिए प्रशिक्षित किया गया है। कृपया दिए गए विषय पर पचास से सौ शब्द आसान बताएं।",
            // };
            const jsonData = {
                ...jsData,
                audio_base64: base64Audio,
                context_history: history,
            };
            const response = await axios.post(
                "https://api.soket.ai/v1/s2s",
                jsonData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
                    },
                }
            );
            if (response.status === 200) {
                console.log("Audio data sent successfully.");
                const jsonResponse = await response.data;
                const base64Audio = await jsonResponse.audio;
                const responseAudioBlob = await base64ToBlob(
                    base64Audio,
                    "audio/wav"
                );
                console.log("jsonResponse: ", jsonResponse);
                return responseAudioBlob;
            } else {
                console.error(
                    "Failed to send audio data:",
                    response.statusText
                );
                return null;
            }
        } catch (error) {
            console.log("error in fetch response: ", error);
            return null;
        }
    }
    async function playAudioWithMovingAverage(audioBlob: Blob) {
        try {
            const alpha = 0.1;
            const audioContext = new AudioContext();
            const arrayBuffer = await audioBlob.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            const audioSource = audioContext.createBufferSource();
            audioSource.buffer = audioBuffer;
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            audioSource.connect(analyser);
            analyser.connect(audioContext.destination);
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            const updateMovingAverage = () => {
                analyser.getByteTimeDomainData(dataArray);
                let sum = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    sum += Math.abs(dataArray[i] - 128); // Convert unsigned byte to centered data
                }
                const average = sum / dataArray.length;
                movingAverageRef.current =
                    (alpha * average + (1 - alpha) * movingAverageRef.current) /
                    50;
                if (audioContext.state !== "closed") {
                    requestAnimationFrame(updateMovingAverage);
                }
            };
            audioSource.onended = async () => {
                await audioContext.close();
                audioStateRef.current = "none";
                animateRef.current = false;
                setBloom([1, 0.5, 0.5]);
                movingAverageRef.current = 0.0;
                setMicDisable(false);
                console.log("Audio ended.");
            };
            audioStateRef.current = "speak";
            audioSource.start();
            updateMovingAverage();
        } catch (error) {
            console.error("Error playing audio:", error);
        }
    }
    async function sendAudioData(audioBlob: Blob) {
        try {
            const responseAudioBlob = await fetchAudioResponse(audioBlob);
            console.log("Audio is playing");
            await playAudioWithMovingAverage(responseAudioBlob!);
        } catch (err) {
            console.error("Error sending audio data:", err);
        } finally {
        }
    }
    // -------------------------------------------------------------------
    async function startRecording() {
        try {
            const audioContext = await setUpAudioRecording();
            audioProcessorRef.current!.port.onmessage = (event) => {
                movingAverageRef.current = event.data;
            };
            audioSourceRef.current!.connect(audioProcessorRef.current!);
            audioProcessorRef.current!.connect(audioContext!.destination);
            mediaRecorderRef.current!.start();
            console.log("Recording started.");
        } catch (err) {
            console.error("Error accessing microphone:", err);
        }
    }
    function stopRecording() {
        if (
            mediaRecorderRef.current &&
            audioSourceRef.current &&
            audioProcessorRef.current
        ) {
            mediaRecorderRef.current.stop();
            audioProcessorRef.current.disconnect();
            audioSourceRef.current.disconnect();
            audioStreamRef
                .current!.getTracks()
                .forEach((track) => track.stop());

            console.log("Recording stopped");
        }
    }
    // ------------------------------------------------------------------------------------------
    function handleClick() {
        if (!micDisable) {
            if (!isRecording) {
                startRecording();
            } else {
                stopRecording();
            }
        }
    }
    return (
        <div className={`${styles} flex flex-col justify-center items-center`}>
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
            <button
                type='button'
                onClick={handleClick}
                className='rounded-full p-2 bg-red-500 text-white shadow-md shadow-red-300 active:shadow-none active:bg-red-400 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-none'
                disabled={micDisable}
            >
                {isRecording ? (
                    <FaStop size={20} />
                ) : (
                    <FaMicrophone size={20} />
                )}
            </button>
        </div>
    );
}

export default AudioSphere;
