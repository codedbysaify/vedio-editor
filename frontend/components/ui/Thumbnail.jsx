"use client"
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
export default function ThumbnailGenerator({ url }) {
    console.log("Url: ", url);
    const videoRef = useRef(null);
    const [duration, setDuration] = useState(null); // Ensure state is local to each component instance

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            video.onloadeddata = () => {
                setDuration(video.duration); // Store the video duration for this specific instance
            };
        }
    }, [url]); // Re-run the effect if the `url` changes

    return (
        <>
        <div className="relative bg-black">

           
            
            {/* Hidden video element, used for processing the thumbnail */}
            <video ref={videoRef} src={url} muted autoPlay style={{ width: "100%" } }
           
                
                
            />

            {/* Display the duration of the video */}
            {duration ? (
                <div className="absolute bottom-2 left-2 bg-black text-white py-1 px-3 rounded-md text-sm">
                    {/* Format the duration to mm:ss */}
                    {`${Math.floor(duration / 60)} : ${Math.floor(duration % 60)}`}
                </div>
            ) : <div className="absolute bottom-2 left-2 bg-black text-white py-1 px-3 rounded-md text-sm">
            {/* Format the duration to mm:ss */}
            {`loading...`}
        </div>}
        </div>
        </>
    );
}
