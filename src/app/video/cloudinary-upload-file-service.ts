import { Injectable } from "@angular/core";
import { Cloudinary } from "@cloudinary/url-gen";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'

})
export class CloudinaryUploadFileService {
    private cloudinary!: Cloudinary;
    constructor() {
        this.cloudinary = new Cloudinary({
            cloud: {
                cloudName: environment.cloudinary.cloudName,
            }
        })
    }
    uploadFile(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', environment.cloudinary.uploadPreset); // Add your upload preset
        formData.append('cloud_name', environment.cloudinary.cloudName); // Add your cloud name

        const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${environment.cloudinary.cloudName}/upload`;

        return fetch(CLOUDINARY_UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Upload failed');
                }
                return response.json();
            })
            .then(data => {
                console.log('Upload successful:', data);
                return data.secure_url;
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                throw error;
            });
    }
}
