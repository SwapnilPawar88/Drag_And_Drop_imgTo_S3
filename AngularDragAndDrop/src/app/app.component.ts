import { Component } from '@angular/core';
import { FileuploadService } from './fileupload.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularDragAndDrop';
  errorMsg = true;
  files: File[] = [];
  uploadMultiplefile = [];
  file: File | undefined;

  constructor(private fileUploadService: FileuploadService) {
    this.errorMsg = false
  }

	onSelect(event) {
		// console.log(event);
    // console.log(event.addedFiles[0]);
    // console.log(...event.addedFiles);
    this.file = event.addedFiles[0]

		this.files.push(...event.addedFiles);
	}

  onSelectmulti(event){
    if(event.addedFiles.length > 0){
      this.uploadMultiplefile = event.addedFiles
    }
    // console.log(this.uploadMultiplefile);
    
  }

  onFileUpload() {
    if (!this.file) {
      this.errorMsg = true
      return
    }
    
    const fileForm = new FormData();
    fileForm.append('file', this.file)

    this.fileUploadService.fileUpload(fileForm).subscribe(
      res => {
        console.log(res);
        alert(`File Uploaded in S3 Bucket With URL -> ${res['file']}`);
      // this.fileUrl = res['file'];
    });
  }

  onMultiFileUpload() {
    if (!this.uploadMultiplefile) {
      this.errorMsg = true
      return
    }
    
    const fileForm = new FormData();
    for(let img of this.uploadMultiplefile){
      fileForm.append('files', img)
    }

    this.fileUploadService.multiFileUpload(fileForm).subscribe(
      res => {
        console.log(res);
        alert(`File Uploaded in S3 Bucket With URL`);
      // this.fileUrl = res['file'];
    });
  }
  
	onRemove(event) {
    console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}  
  
}
