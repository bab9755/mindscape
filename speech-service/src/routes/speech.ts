import express, { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs-extra';
import { CloudSpeech } from '../services/cloud-speech';
import { CloudStorageService } from '../services/cloud-storage';
import { AudioConverter } from '../services/audio-converter';
import busboy from 'busboy';
import { BusboyFileStream } from '../types/types';
import { upload } from '@google-cloud/storage/build/cjs/src/resumable-upload';
import { v4 as uuidv4 } from 'uuid';

// Extend Request interface to include file property
interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

const router = express.Router();
const cloudStorage = new CloudStorageService(process.env.GCLOUD_SPEECH_BUCKET || 'run-sources-mindscape-462011-us-east1');
const cloudSpeech = new CloudSpeech();
const audioConverter = new AudioConverter();


router.post('/transcribe', async (req: Request, res: Response) => {
    let uploadFinish = false;
    try {
        const busboyInstance = busboy({ headers: req.headers });
        busboyInstance.on(
            'file',
            (
                fieldname: string,
                file: BusboyFileStream,
                filename: string,
                encoding: string,
                mimetype: string
            ): void => {
                console.log(`Received file: ${filename}, Type: ${mimetype}`);
                let safeFilename = `${uuidv4()}.audio`;
                const gcsFile = cloudStorage.bucket.file(safeFilename)
                const gcsStream = gcsFile.createWriteStream({
                    resumable: false,
                    contentType: mimetype
                });
                file.pipe(gcsStream);

                gcsStream.on('error', (error: Error) => {
                    console.error('Error uploading file to Cloud Storage:', error);
                    res.status(500).json({ error: 'Failed to upload file' });
                })

                gcsStream.on('finish', async () => {
                    console.log(`File uploaded successfully: ${safeFilename}`);
                    uploadFinish = true;

                    try {
                        uploadFinish = true;
                        const audioCloudUrl = `gs://${cloudStorage.bucket.name}/${safeFilename}`;
                        console.log(`Audio file URL: ${audioCloudUrl}`);
                        
                        const isShort = req.headers["x-audio-duration"] && parseFloat(req.headers["x-audio-duration"] as string) < 60;

                        let transcription: string;

                        if (isShort) {
                            transcription = await cloudSpeech.transcribeShortAudio(audioCloudUrl); 
                        } else {
                            transcription = await cloudSpeech.transcribeLongAudio(audioCloudUrl);
                        }

                        res.status(200).json({
                            transcription: transcription,
                            audioUrl: audioCloudUrl,
                            duration: req.headers["x-audio-duration"] || 'unknown'
                        });

                    } catch (error) {
                        console.error('Error during transcription:', error);
                        res.status(500).json({ error: 'Failed to transcribe audio' });
                    }
                }
                );
            }
            
            
        );
        busboyInstance.on("finish", () => {

        });

        req.pipe(busboyInstance);


    } catch (error) {
        console.error('Error during transcription:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        supportedFormats: audioConverter.getSupportedFormats(),
        maxFileSize: '50MB'
    });
});

export default router;
