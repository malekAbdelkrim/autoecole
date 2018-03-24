import { Component, View } from "@angular/core";
import { bootstrap } from "angular2/platform/browser";
import { AutoEcoleService } from "./autoecole.service";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";



@Component({
	selector: 'app-upload'
	templateUrl: './upload.component.html'
})

export class UploadComponent{
	filesToUpload: Array<File> = [];
	ext: String = "";
    constructor(private http: Http) {}

upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files[0].name);
   	this.ext = files[0].name.split(".")[1];
    console.log(this.ext);
    if(this.ext == "png" || this.ext == "gif" || this.ext == "jpg" || this.ext == "jpeg"){
        formData.append("uploads[]", files[0], files[0]['name']);
   		console.log(formData.toString());
    	console.log('form data variable :   '+ formData.toString());
        this.http.post('http://localhost:3000/upload_logo', formData)
        .map(files => files.json())
        .subscribe(files => console.log('files', files));
    } else{
     alert("Attention les images au format '"+this.ext+"' ne sont pas autorisées !\n");
    }
   		
}

fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
}

 
}