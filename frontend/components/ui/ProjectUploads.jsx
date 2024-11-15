import { useState, useRef } from 'react';
import { FaDownload } from 'react-icons/fa';
import VideoBox from './VideoBox';
import axios from 'axios';

function ProjectUploads() {
  const [mediaFile, setMediaFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [selectedMediaSrc, setSelectedMediaSrc] = useState(null);
  const projectVideoRef = useRef(null);
  const [isVideo, setIsVideo] = useState(false);
  const [cloudurl, setCloudUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileClick = () => {
    if (!mediaFile) {
      document.getElementById('mediaUpload').click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type;
    const userName = "Test";
    const fileName = file.name;

    const toGetURLparams = { fileType, fileName, userName };
    const getURL = "http://localhost:4000/api/uploadDataUrl";

    try {
      setLoading(true);
      const response = await axios.post(getURL, toGetURLparams);
      const { url } = response.data;

      const uploadResponse = await axios.put(url, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      if (uploadResponse.status === 200) {
        const cloudUrl = url.split('?')[0];
        setMediaFile(cloudUrl);
        setCloudUrl(cloudUrl);
      }

      if (file.type.startsWith('video/')) {
        setIsVideo(true);
      } else if (file.type.startsWith('image/')) {
        setImgUrl(URL.createObjectURL(file));
      } else {
        alert('Please select a valid video or image file.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailClick = () => {
    setSelectedMediaSrc(mediaFile);
  };

  const handleUploadAgain = () => {
    setMediaFile(null);
    setImgUrl(null);
    setSelectedMediaSrc(null);
  };

  return (
    <div className="flex flex-col items-center text-center">
      {/* Main upload box */}
      <div
        className={`${
          mediaFile ? 'border-blue-400' : 'border-dashed'
        } border-2 flex flex-col justify-center items-center rounded-[15px] w-[200px] h-[100px] overflow-hidden cursor-pointer relative`}
        onClick={handleFileClick}
      >
        {/* Display uploaded media */}
        {mediaFile && (
          isVideo ? (
            <video
              ref={projectVideoRef}
              src={mediaFile}
              className="w-full h-auto rounded-[15px] cursor-pointer"
              muted
              autoPlay
              onClick={handleThumbnailClick}
            />
          ) : (
            <img
              src={imgUrl}
              alt="Uploaded Preview"
              className="w-full h-auto rounded-[15px] cursor-pointer"
              onClick={handleThumbnailClick}
            />
          )
        )}

        {/* Placeholder Text when no file is uploaded */}
        {!mediaFile && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center px-2 cursor-pointer text-gray-400">
            <FaDownload className="text-sm mr-2" />
            <p className="text-xs">There is nothing yet. Click here to upload.</p>
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

      {/* Display uploaded media */}
      {selectedMediaSrc && <VideoBox mediaSrc={selectedMediaSrc} isVideo={isVideo} />}

      {/* Recent Uploads Section */}
      <h2 className="mt-4 text-lg font-semibold">Recent Uploads</h2>
      <div className="flex flex-col gap-2 mt-2">
        <div className="w-[200px] h-[100px] rounded-[15px] overflow-hidden">
          <img
            src="video_pic_1.jpeg"
            alt="Placeholder 1"
            className="w-full h-full"
          />
        </div>
        <div className="w-[200px] h-[100px] rounded-[15px] overflow-hidden">
          <img
            src="video_pic_2.jpeg"
            alt="Placeholder 2"
            className="w-full h-full"
          />
        </div>
        <div className="w-[200px] h-[100px] rounded-[15px] overflow-hidden">
          <img
            src="video_pic_3.jpeg"
            alt="Placeholder 3"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectUploads;
