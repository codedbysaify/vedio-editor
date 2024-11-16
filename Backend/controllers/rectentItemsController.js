import { GetObjectCommand, ListObjectsV2Command, HeadObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../configs/s3_config.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const getRecentItems = async (req, res) => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: `projectUploads/${req.query.userId}/` // Specify folder
        });
        
        const objects = await s3Client.send(command);

        if (!objects.Contents) {
            return res.status(404).json({ message: "No items found in this folder" });
        }

        const urls = await Promise.all(
            objects.Contents.map(async (object) => {
                const url = await getSignedUrl(s3Client, new GetObjectCommand({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: object.Key
                }));
                
                // Retrieve file metadata to get ContentType
                const headCommand = new HeadObjectCommand({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: object.Key
                });
                const headData = await s3Client.send(headCommand);
                
                return {
                    url,
                    name: object.Key.split('/').pop(), // Get the file name
                    type: headData.ContentType // Get the file type (e.g., "image/jpeg", "video/mp4")
                };
            })
        );

        res.status(200).json(urls);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
