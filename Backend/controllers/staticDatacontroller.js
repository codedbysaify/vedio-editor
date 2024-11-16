import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import s3Client from "../configs/s3_config.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv';

const getUrl = async (key) => {
    const command = new GetObjectCommand({
        Bucket: "vestatic",
        Key: key
    });
    const url = await getSignedUrl(s3Client, command);
    return url;
};

// Function to get MIME type based on file extension
const getMimeType = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    const mimeTypes = {
        'mp4': 'video/mp4',
        'mp3': 'audio/mp3',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'pdf': 'application/pdf',
        'txt': 'text/plain',
    };
    return mimeTypes[ext] || 'application/octet-stream'; // Default to binary stream if unknown
};

export const getStaticData = async (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        dotenv.config({ path: ".env.production" });
    } else {
        dotenv.config();
    }

    try {
        console.log("Environment variables: ", process.env.AWS_BUCKET_NAME);

        const command = new ListObjectsV2Command({
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: 'cloudUploads'
        });

        const objects = await s3Client.send(command);

        if (objects['$metadata'].httpStatusCode === 200) {
            let urls = await Promise.all(
                objects.Contents.filter(item => item.Size !== 0).map(async (item) => {
                    let url = await getUrl(item.Key);
                    const fileName = item.Key.split('/').pop(); // Extract the file name
                    const mimeType = getMimeType(fileName); // Get MIME type based on file extension

                    return {
                        url,
                        name: fileName,
                        type: mimeType // Include MIME type in the response
                    };
                })
            );

            res.status(200).json({
                result: "success",
                contents: urls
            });
        } else {
            res.status(400).json({
                result: "bad request",
                contents: []
            });
        }
    } catch (error) {
        console.log("Error", error);
        res.status(404).json({
            result: "Internal server Error",
            contents: []
        });
    }
};
