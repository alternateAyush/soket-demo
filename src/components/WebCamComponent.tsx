import React, { useEffect, useRef } from "react";

const WebCamCompoent= () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }, // Use "environment" for the back camera
          audio: false, // Set to true if audio is needed
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream; // Assign the video stream to the video element
        }
      } catch (err) {
        console.error("Error accessing the camera:", err);
        alert("Unable to access the camera. Please check permissions.");
      }
    };

    startCamera();

    // Cleanup: Stop the camera stream when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          objectFit: "cover", // Ensures the video covers the parent while maintaining aspect ratio
        }}
      />
    </div>
  );
};

export default WebCamCompoent;
