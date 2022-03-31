import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(private http: HttpClient) { }

  fileUpload(file) {
    console.log(file);
    return this.http.post('http://localhost:8000/api/upload', file);
  }

  multiFileUpload(files) {
    console.log(files);
    return this.http.post('http://localhost:8000/api/uploadMulti', files);
  }
}
