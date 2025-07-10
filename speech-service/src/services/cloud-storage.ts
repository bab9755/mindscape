import { Storage } from '@google-cloud/storage';

export class CloudStorageService {
    public storage: Storage;
    public bucket: any

    constructor(bucketName: string) {
        this.storage = new Storage();
        this.bucket = this.storage.bucket(bucketName);
    }
    async uploadFile(filePath: string, bucketName: string, destinationFileName: string): Promise<string> {
        try {
            const bucket = this.storage.bucket(bucketName);
            const file = bucket.file(destinationFileName);
            await file.save(filePath);
            const cloudUrl = `gs://${bucketName}/${destinationFileName}`;
            return cloudUrl;
        } catch (error) {
            console.error('Error uploading file to Cloud Storage:', error);
            throw error;
        }
    }
}
