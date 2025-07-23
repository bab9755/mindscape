import axios from 'axios';

export async function transcribe(audio: File, duration: number) {
    const formData = new FormData();
    formData.append('file', audio);

    try {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_SPEECH_URL}/transcribe`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'duration': duration.toString(),
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to transcribe audio');
    }
}
