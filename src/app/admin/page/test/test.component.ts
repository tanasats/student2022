import { UploadService } from './../../../service/upload.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  imagePreviewSrc: string | ArrayBuffer | null | undefined = '';
  isImageSelected: boolean = false; 

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  get f(){
    return this.myForm.controls;
  }
  constructor(private uploadService:UploadService) { }

  ngOnInit(): void {
  }

  
  showPreview(event:any){ // Event) {
    // tip: event.target.files this is FileList Object
    console.log("showPreview()",event.target.files.item(0));
    let selectedFile = (event.target as HTMLInputElement).files?.item(0)
    if (selectedFile) {
      //console.log(selectedFile);
      this.myForm.patchValue({
        fileSource: selectedFile
      });
    }
    if (selectedFile) {
      if (["image/jpeg", "image/png", "image/svg+xml"].includes(selectedFile.type)) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(selectedFile);
        fileReader.addEventListener('load', (event) => {
          this.imagePreviewSrc = event.target?.result;
          this.isImageSelected = true
        })
      }
    } else {
      this.isImageSelected = false
    }
  }

  submitUpload(){
    const file = this.myForm.get('fileSource')?.value;
    //const formdata = this.myForm.getRawValue();
    //console.log("formdata:",formdata);

    this.uploadService.upload(file).subscribe({
      next: (v) => {
        console.log("v=",v);
      },
      error: (e) => {
        console.log('e=',e);
      }
    })
  }

} //class
