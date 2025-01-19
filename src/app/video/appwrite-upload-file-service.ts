import { Injectable } from '@angular/core';
import { Client, Storage } from 'appwrite';

@Injectable({
    providedIn: 'root'
})
export class AppwriteService {
    private client;
    private storage;
    private bucketId = '678d31f1000229dfc381'

    constructor() {
        this.client = new Client();

        this.client
            .setEndpoint('https://cloud.appwrite.io/v1') // Correct AppWrite Endpoint
            .setProject('678cc4d3001d7188b01a'); // Your project ID

        this.storage = new Storage(this.client);
    }

    async uploadVideo(file: File) {
        try {
            const response = await this.storage.createFile(
                this.bucketId,
                'unique()',
                file
            );
            console.log('Video uploaded successfully:', response);
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    }

    async listFiles() {
        try {
            const files = await this.storage.listFiles(this.bucketId);
            console.log('Files:', files);
            return files;
        } catch (error) {
            console.error('Error listing files:', error);
            return []; // Return empty array in case of error
        }
    }
}
