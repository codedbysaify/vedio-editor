import { useState, useRef, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import VideoBox from './VideoBox';
import VideoSnapshot from 'video-snapshot';
import axios from 'axios';

function ProjectUploads() {
  const [mediaFile, setMediaFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [selectedMediaSrc, setSelectedMediaSrc] = useState(null); // For VideoBox display
  const projectVideoRef = useRef(null);
  const [isVideo, setIsVideo] = useState(false); // Identify if the file is a video
  const [cloudurl, setCloudUrl] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for upload process

  const handleFileClick = () => {
    if (!mediaFile) {
      document.getElementById('mediaUpload').click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);

    if (!file) return;

    const fileType = file.type;
    const userName = "Test"; //! Should be changed when setting up authentication
    const fileName = file.name;

    const toGetURLparams = {
      fileType,
      fileName,
      userName
    };

    const getURL = "http://localhost:4000/api/uploadDataUrl"; //! Should be from .env file

    try {
      setLoading(true); // Start loading state

      const response = await axios.post(getURL, toGetURLparams);
      const { url } = response.data;

      // Upload file using the pre-signed URL
      const uploadResponse = await axios.put(url, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      if (uploadResponse.status === 200) {
        console.log('File uploaded successfully!');
        const cloudUrl = url.split('?')[0]; // Strip off the query parameters for playback URL
        setMediaFile(cloudUrl); // Update the mediaFile state immediately
        setCloudUrl(cloudUrl); // Update cloudurl state
      } else {
        console.log('Upload failed.');
      }

      // Handle video or image preview
      if (file && (file.type.startsWith('video/') || file.type.startsWith('image/'))) {
        const fileURL = URL.createObjectURL(file);

        if (file.type.startsWith('video/')) {
          setIsVideo(true);
          // const snapshoter = new VideoSnapshot(file);
          // const previewSrc = await snapshoter.takeSnapshot();
          // setImgUrl(previewSrc); // For video snapshot
        } else {
          setIsVideo(false);
          setImgUrl(fileURL); // Set image URL if it's an image
        }
      } else {
        alert('Please select a video or image file.');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Handle thumbnail click to display video/image in VideoBox
  const handleThumbnailClick = () => {
    setSelectedMediaSrc(mediaFile); // Set selected media for VideoBox without affecting ProjectUploads playback
  };

  const handleMediaClick = () => {
    if (isVideo && projectVideoRef.current) {
      if (projectVideoRef.current.paused) {
        projectVideoRef.current.play();
      } else {
        projectVideoRef.current.pause();
      }
    }
  };


  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`${mediaFile ? 'items-start' : 'justify-center items-center'} flex flex-col hover:cursor-pointer relative rounded-[30px] overflow-hidden ${
          mediaFile ? 'border-2 border-blue-400 border-solid w-[170px] h-[100px]' : 'border-2 border-dashed'
        }`}
        onClick={handleFileClick}
      >
        {mediaFile ? (
          <>
            {!isVideo && (
              <img
                src={imgUrl}
                alt="Media Thumbnail"
                className="w-full h-auto rounded-[30px] cursor-pointer"
                onClick={handleThumbnailClick} // Click to display in VideoBox
              />
            )}
            {/* Video display in ProjectUploads */}
            {isVideo && (
              <video
                ref={projectVideoRef}
                src={mediaFile}
                className="w-full h-auto rounded-[30px] cursor-pointer"
                onClick={handleThumbnailClick} // Controls for independent playback in ProjectUploads
                muted
                autoPlay
              />
            )}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center py-12 rounded-[15px]">
            <p>
              <FaDownload className="text-3xl text-gray-400 mb-4" />
            </p>
            <p className="text-gray-300">There is nothing yet. Click here to upload</p>
          </div>
        )}
      </div>

      <input
        type="file"
        id="mediaUpload"
        style={{ display: 'none' }}
        accept="video/*,image/*"
        onChange={handleFileChange}
      />

      {selectedMediaSrc && (
        <VideoBox mediaSrc={selectedMediaSrc} isVideo={isVideo} /> // Display in VideoBox without removing from ProjectUploads
      )}
    </div>
  );
}

export default ProjectUploads;
