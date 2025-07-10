import { SpeechClient } from '@google-cloud/speech';


export class CloudSpeech {
    public client: SpeechClient; 

    constructor() {
        this.client = new SpeechClient();
    }

    async transcribeShortAudio(audioCloudUrl: string): Promise<string> {
        try {
            const request = {
                config: {
                    encoding: 'LINEAR16' as const,
                    languageCode: 'en-US',
                    enableAutomaticPunctuation: true,
                    enableWordTimeOffsets: false,
                    audioChannelCount: 2, // <-- Add this
                    enableSeparateRecognitionPerChannel: true, // <-- Add this
                },
                audio: {
                    uri: audioCloudUrl,
                },
            };

            const [response] = await this.client.recognize(request);
            const transcription = response.results
                ?.map(result => result.alternatives?.[0]?.transcript)
                .filter(Boolean)
                .join(' ') || '';

            return transcription;
        } catch (error) {
            console.error('Error transcribing audio:', error);
            throw error;
        }
    }
    async transcribeLongAudio(gcsUri: string): Promise<string> {

        try {
            const request = {
                config: {
                    encoding: 'LINEAR16' as const,
                    languageCode: 'en-US',
                    enableAutomaticPunctuation: true,
                    enableWordTimeOffsets: false,
                    audioChannelCount: 2, // <-- Add this
                    enableSeparateRecognitionPerChannel: true, // <-- Add this
                },
                audio: {
                    uri: gcsUri,
                },
            };

            const [operation] = await this.client.longRunningRecognize(request);
            const [response] = await operation.promise() as any;
            const transcription = response.results
                ?.map((result: any) => result.alternatives?.[0]?.transcript)
                .filter(Boolean)
                .join(' ') || '';

            return transcription as string;
        } catch (error) {
            console.error('Error transcribing long audio:', error);
            return '';
        }    
    }
}