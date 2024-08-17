import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    const axiosInstance = axios.create({
        baseURL: 'https://abfrontendhackerthon.onrender.com/tags',
    });
    const TagService = {
        async getAllTags() {
            try {
                const response = await axiosInstance.get('/list');
                return response.data;
            } catch (error) {
                console.log({ error });
                throw error;
            }
        },
    }

    return {
        provide: {
            TagService
        }
    }
});