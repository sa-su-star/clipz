import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid'
import { AppwriteService } from '../appwrite-upload-file-service';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  isDragOver = false;
  file: File | null = null;
  nextStep = false;
  title = new FormControl('', [Validators.required, Validators.minLength(3)])
  uploadForm = new FormGroup({
    title: this.title
  })
  videos: any;
  constructor(private appwriteService: AppwriteService) { }

  ngOnInit(): void {
    this.fetchVideos();
  }
  storeFile(event: Event) {
    this.isDragOver = false;
    const dragEvent = event as DragEvent;
    this.file = dragEvent.dataTransfer?.files[0] ?? null;
    if (!this.file || this.file.type !== 'video/mp4') {
      return
    }
    console.log(this.file)
    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/, "")
    )
    this.nextStep = true;
  }
  uploadFile() {
    if (this.file) {
      this.appwriteService.uploadVideo(this.file).then(
        event => {
          console.log(event);
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  fetchVideos(): void {
    this.appwriteService.listFiles().then(files => {
      console.log('Files in bucket:', files);
    });
  }
}
