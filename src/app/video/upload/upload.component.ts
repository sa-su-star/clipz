import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid'
import { CloudinaryUploadFileService } from '../cloudinary-upload-file-service';
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
  constructor(private cloudinaryService: CloudinaryUploadFileService) { }

  ngOnInit(): void {
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
      this.cloudinaryService.uploadFile(this.file).subscribe(
        event => {
          console.log(event);
        },
        error => {
          console.error(error);
        }
      );
    }
  }
  // uploadFile() {
  //   if (!this.file) {
  //     console.error('No file selected');
  //     return;
  //   }

  //   this.cloudinaryService.uploadFile(this.file)
  //     .then((fileUrl) => {
  //       console.log('File uploaded successfully:', fileUrl);
  //       // You can now save the fileUrl to your database or use it as needed
  //     })
  //     .catch((error) => {
  //       console.error('Error uploading file:', error);
  //     });
  // }
}
