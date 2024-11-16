// CloudUploads.js
"use client"
import { useEffect, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import ThumbnailGenerator from './Thumbnail';
import Loader from './Loader';
function CloudUploads() {
const [urls,setUrls]=useState([]);
const [loading,setIsloading]=useState(false)
const getData=async ()=>{
  const url="http://localhost:4000/api/getStaticVideos"
  const rawData=await axios.get(url);
  const parsedData=rawData.data
  setUrls(parsedData.contents);
  console.log(parsedData.contents)
  setIsloading(false)
}

useEffect(()=>{
    setIsloading(true)
    getData();
},[])
useEffect(()=>{},[urls])
  return (

    <div className="space-y-4">
      {/* Cloud Upload Button */}
      
      <button className="flex items-center justify-center space-x-2 w-full bg-gray-200 p-3 rounded-md">
        <FaCloudUploadAlt className="text-2xl text-gray-700" />
        <span className="text-lg text-gray-700 font-semibold">Click to upload new file</span>
      </button>
      {
       loading ? <Loader/> : (
      
      <div className="grid grid-cols-1 gap-4">
        {
          (urls.length > 0) && urls.map((e,index)=>{
            return(
              <ThumbnailGenerator url={e.url} name={e.name} type={e.type} key={index}/>
            )
          })
        }
      </div>
         ) }
    </div>
  );
}

export default CloudUploads;
