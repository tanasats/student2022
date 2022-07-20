import { FacultyService } from './../../../service/faculty.service';
import { IFaculty,IFacultyFormGroup } from './../../../interface/faculty';
import { UploadService } from './../../../service/upload.service';
import { Component, OnInit } from '@angular/core';

import { NotificationService } from 'src/app/service/notification.service';
//import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  public items: IFaculty[] = [];
  public itemSelected: IFaculty | undefined;
  //public closeResult: string = '';

  public page: number = 1;
  public pagesize: number = 10;
  public keyword: string = '';

  public itemsfound: number = 0;
  public pagetotal: number = 0;

  public loading: boolean = true;

  public formFaculty: FormGroup;


  constructor(
        private formBuilder: FormBuilder, 
        private facultyService: FacultyService,
        private notifyService: NotificationService,) { 

          this.formFaculty = this.formBuilder.group({
            faculty_id: [null, []],
            faculty_code:[null, [Validators.required]],
            faculty_name:[null, [Validators.required]],
            faculty_name_en:[null, []],
          }) as IFacultyFormGroup;    
      
        }
  ngOnInit(): void {
    this.getItems();
  }


  get f(): { [key: string]: AbstractControl } {
    return this.formFaculty.controls;
  }

  searchkeydown(event: any) { 
    if (event.key === 'Enter') {
      console.log('search:', this.keyword);
      this.getItems();
    }
  }
  getItems() {
    this.loading = true;
    //this.acttypeService.getAll().subscribe({
    this.facultyService
      .filter({
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword,
      })
      .subscribe({
        next: (v) => {
          this.loading = false;
          console.log(v);
          this.pagetotal = v.totalpage;
          this.itemsfound = v.itemscount;
          this.items = v.items;
          if (this.page > this.pagetotal && this.itemsfound)
            this.changepage(this.page - 1);
        },
        error: (e) => {
          this.notifyService.show('error', e, '');
        },
      });
  }

  changepage(pageno: number) {
    console.log('set page ' + pageno);
    if (pageno < 1) {
      this.page = 1;
    } else {
      this.page = pageno;
    }
    this.getItems();
  }

  previouspage() {
    if (this.page > 1) {
      this.page--;
      this.getItems();
    }
  }
  nextpage() {
    if (this.page < this.pagetotal) {
      this.page++;
      this.getItems();
    }
  }

  deleteItem(item: IFaculty) {
    this.itemSelected = item;
  }
  submitDelete(){
    var id = this.itemSelected?.faculty_id;
    this.facultyService.delete(id).subscribe({
      next: (v) => {
        console.log("result:",v);
        this.getItems();
        this.closeModal('deleteModal');
        this.notifyService.show('success', 'ลบข้อมูลแล้ว', '');
      },
      error: (e) => {
        console.log("error:",e);
      }
    })
  }

  addnewItem() {
    this.formFaculty.reset();
  }
  submitAddnew(){
    const datas = this.formFaculty.getRawValue();
    this.facultyService.create(datas).subscribe({
      next: (v) => {
        console.log("result:",v);
        this.getItems();
        this.closeModal('addnewModal');
        this.notifyService.show('success', 'บันทึกข้อมูลแล้ว', '');
      },
      error: (e) => {
        console.log("error:",e);
      }
    })
  }
  
  updateItem(item: IFaculty) {
    this.formFaculty.patchValue(item);
  }
  submitUpdate(){
    const datas = this.formFaculty.getRawValue();
    this.facultyService.update(datas).subscribe({
      next: (v) => {
        console.log('result:',v);
        this.getItems();
        this.closeModal('updateModal');
        this.notifyService.show('success', 'บันทึกข้อมูลแล้ว', '');
      },
      error: (e) => {
        console.log('error:',e);
      }
    })
  }

  

  closeModal(id:string){
    var modal = document.getElementById(id);
    console.log(modal);
    modal?.click();
  }



}//class
