import { S3Client } from "@aws-sdk/client-s3";
import dotenv from 'dotenv'
if(process.env.NODE_ENV === 'production'){
    dotenv.config({path:".env.production"})
}else{
    dotenv.config();
}
const s3Client=new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_KEY,
        secretAccessKey:process.env.AWS_SECRETKEY
    }
})
export default s3Client;