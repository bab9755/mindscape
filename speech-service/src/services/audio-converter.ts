import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs-extra';
import path from 'path';

export class AudioConverter {
    private readonly supportedFormats = ['wav', 'mp3'];
    private readonly tempDir = path.join(process.cwd(), 'temp');

    constructor() {
        fs.ensureDirSync(this.tempDir);
    }
    isSupportedFormat(filename: string): boolean {
        const ext = path.extname(filename).toLowerCase().slice(1);
        return this.supportedFormats.includes(ext);
    }

    getFileExtension(filename: string): string {
        return path.extname(filename).toLowerCase().slice(1);
    }
    async convertToWav(inputPath: string, originalFilename: string): Promise<string> {
        const inputExt = this.getFileExtension(originalFilename);
        
        if (inputExt === 'wav') {
            return inputPath;
        }

        const outputFilename = `converted_${Date.now()}.wav`;
        const outputPath = path.join(this.tempDir, outputFilename);

        return new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .toFormat('wav')
                .audioCodec('pcm_s16le') 
                .audioChannels(1) 
                .audioFrequency(16000) 
                .on('end', () => {
                    console.log(`Audio converted successfully: ${outputPath}`);
                    resolve(outputPath);
                })
                .on('error', (err: Error) => {
                    console.error('Audio conversion error:', err);
                    reject(new Error(`Failed to convert audio: ${err.message}`));
                })
                .save(outputPath);
        });
    }
    async cleanupTempFile(filePath: string): Promise<void> {
        try {
            if (await fs.pathExists(filePath)) {
                await fs.remove(filePath);
                console.log(`Cleaned up temp file: ${filePath}`);
            }
        } catch (error) {
            console.error('Error cleaning up temp file:', error);
        }
    }
    getSupportedFormats(): string[] {
        return [...this.supportedFormats];
    }
}
