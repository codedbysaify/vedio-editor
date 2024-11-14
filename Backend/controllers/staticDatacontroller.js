//* Returns url array of all static content


import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import s3Client from "../configs/s3_config.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv';

const getUrl=async (key)=>{
    const command = new GetObjectCommand({
        Bucket:"vestatic",
        Key:key
    })
    const url=await getSignedUrl(s3Client,command);
    return url;
}
export const getStaticData=async(req,res)=>{

    if(process.env.NODE_ENV === 'production'){
        dotenv.config({path:".env.production"})
    }else{
        dotenv.config();
    }
   try {
    // const command=new GetObjectCommand({
    //     Bucket:"vestatic",
    //     Key:'v1.mp4'
    // })
    //  const urls=await getSignedUrl(s3Client,command);
    console.log("Environment variables: ",process.env.AWS_BUCKET_NAME);
    const command=new ListObjectsV2Command({
        Bucket:process.env.AWS_BUCKET_NAME,
        Prefix:'cloudUploads'
    })
    const objects= await s3Client.send(command);
    
    if(objects['$metadata'].httpStatusCode === 200){
        let urls=await Promise.all(objects.Contents.filter(item=>item.Size !== 0).map(async(item)=>{

            let url=await getUrl(item.Key);
            return url;
        }))


        res.status(200).json({
            result:"success",
            contents:urls
        })
    }else{

        res.status(400).json({
            result:"bad request",
            contents:[]
        })
    }
   } catch (error) {
    console.log("Error",error)
    res.status(404).json({
        result:"Internal server Error",
        contents:[]
    })
   }
}

/*
Environment variables:  undefined
{
  '$metadata': {
    httpStatusCode: 200,
    requestId: 'DBA8RNA1RM7AJYBY',
    extendedRequestId: 'f7LWC/ygBWDmML4sb1aO23hKmH6FmZPmegZg7aPA9/PVz2OXMBGIZsmOtGmMhAWNSSrFowNgveo=',
    cfId: undefined,
    attempts: 1,
    totalRetryDelay: 0
  },
  Contents: [
    {
      Key: 'v1.mp4',
      LastModified: 2024-11-12T21:03:16.000Z,
      ETag: '"851e8435139d5e14c571260daa8c6da3-2"',
      Size: 26374916,
      StorageClass: 'STANDARD'
    },
    {
      Key: 'v2.mp4',
      LastModified: 2024-11-12T21:04:07.000Z,
      ETag: '"a4fb5050f4ffe598ee1b785e6accced6"',
      Size: 14524893,
      StorageClass: 'STANDARD'
    },
    {
      Key: 'v3.mp4',
      LastModified: 2024-11-12T21:03:16.000Z,
      ETag: '"6232c6aac0c8b192aa520d3ab68332c1-5"',
      Size: 76468749,
      StorageClass: 'STANDARD'
    }
  ],
  IsTruncated: false,
  KeyCount: 3,
  MaxKeys: 1000,
  Name: 'vestatic',
  Prefix: ''
}
*/