import { useState, useRef } from 'react';
import { FaDownload } from 'react-icons/fa';
import VideoBox from './VideoBox';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCurrentVideo } from '../statemanagement/slices/currentObjects';

function ProjectUploads() {
  const [mediaFile, setMediaFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [selectedMediaSrc, setSelectedMediaSrc] = useState(null);
  const projectVideoRef = useRef(null);
  const [isVideo, setIsVideo] = useState(false);
  const [cloudurl, setCloudUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userName,setUserName] = useState("Test");
  const [recentUploads, setRecentUploads] = useState([]);
  const [mediaDurations, setMediaDurations] = useState({});
  const [recentUploadsLoading, setRecentUploadsLoading] = useState(true);
  const dispatch=useDispatch();
  const currentObjects=useSelector((state)=>state.currentVideo);
  useEffect(()=>{
    console.log(currentObjects);
  },[currentObjects])
  const handleFileClick = () => {
    if (!mediaFile) {
      document.getElementById('mediaUpload').click();
    }
  };
  const getRecentUploads = async () => {
    try {
      setRecentUploadsLoading(true);
      const getURL = "http://localhost:4000/api/recentitems";
      const response = await axios.get(getURL, {
        params: { userId: userName }
      });
      setRecentUploads(response.data);
    } catch (error) {
      console.error("Error fetching recent uploads:", error);
    }finally {
      setRecentUploadsLoading(false);
    }
  };
  const handleLoadedMetadata = (mediaId, event) => {
    setMediaDurations(prev => ({
      ...prev,
      [mediaId]: formatDuration(event.target.duration)
    }));
  };

  // Add this helper function
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type;
    const userName = userName;
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

  const handleThumbnailClick = (url,type,name) => {
    const payload={
      url,
      title:name,
      type:type
    }
    dispatch(addToCurrentVideo(payload))


  };



  const handleUploadAgain = () => {
    setMediaFile(null);
    setImgUrl(null);
    setSelectedMediaSrc(null);
  };
  useEffect(() => {
    getRecentUploads();
  }, []);

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
      {mediaFile ? (
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
      ) : (
        // Placeholder Text when no file is uploaded
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
    {/* {selectedMediaSrc && <VideoBox mediaSrc={selectedMediaSrc} isVideo={isVideo} />} */}
  
    {/* Recent Uploads Section */}
    <h2 className="text-lg font-medium mt-4 mb-2">Recent Items</h2>
    {recentUploadsLoading ? (
  <div className="flex justify-center items-center h-[100px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
) : (
    <div className="flex flex-col gap-2 mt-2">
      {recentUploads.map((upload, index) => (
        <div key={index} className="w-[200px] h-[100px] rounded-[15px] overflow-hidden relative">
          {upload.type.startsWith('image/') && (
            <img
              src={upload.url}
              alt={upload.name}
              className="w-full h-full object-cover"
              onClick={() => handleThumbnailClick(upload.url,upload.type,upload.name)}
            />
          )}
          {upload.type.startsWith('video/') && (
            <>
              <video
                src={upload.url}
                className="w-full h-full object-cover"
                muted
                onLoadedMetadata={(e) => handleLoadedMetadata(index, e)}  
                onClick={() => handleThumbnailClick(upload.url,upload.type,upload.name)}
              />
              {mediaDurations[index] && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                  {mediaDurations[index]}
                </div>
              )}
            </>
          )}
          {upload.type.startsWith('audio/') && (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center relative">
              <audio 
                src={upload.url} 
                className="w-full" 
                controls 
                onLoadedMetadata={(e) => handleLoadedMetadata(index, e)}
                onClick={() => handleThumbnailClick(upload.url,upload.type,upload.name)}
              />
              {mediaDurations[index] && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                  {mediaDurations[index]}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )}
  </div>
  
  );
}

export default ProjectUploads;
