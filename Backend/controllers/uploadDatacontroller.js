import s3Client from "../configs/s3_config.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv'
export const uploadDatacontroller=async (req,res)=>{
    const {fileName,fileType,userName}=req.body;
    if(process.env.NODE_ENV === 'production'){
        dotenv.config({path:".env.production"})
    }else{
        dotenv.config();
    }
    const filePath=`projectUploads/${userName}/${fileName}`

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filePath,
        ContentType: fileType,
      });

      try {
        const uploadUrl=await getSignedUrl(s3Client,command,{expiresIn:3600});
        res.status(200).json({url: uploadUrl });
        
      } catch (error) {
        console.log(error);
        res.status(404).json({ url:"Internal server error" });
      }
}