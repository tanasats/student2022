import { IActorganization, IActorganizationFormGroup } from 'src/app/interface/actorganization';
import { Component, OnInit, enableProdMode } from '@angular/core';
import { ActorganizationService } from 'src/app/service/actorganization.service';
import { NotificationService } from 'src/app/service/notification.service';
//import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-actorganization',
  templateUrl: './actorganization.component.html',
  styleUrls: ['./actorganization.component.css'],
}) 
export class ActorganizationComponent implements OnInit {
  public items: IActorganization[] = [];
  public itemSelected: IActorganization | undefined;
  //public closeResult: string = '';

  public page: number = 1;
  public pagesize: number = 10;
  public keyword: string = '';

  public itemsfound: number = 0;
  public pagetotal: number = 0;

  public loading: boolean = true;

  public formActorganization: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private actorganizationservice: ActorganizationService,
    private notifyService: NotificationService,
    //private modalService: NgbModal
  ) {

    this.formActorganization = this.formBuilder.group({
      actorganization_id: [null, []],
      actorganization_code: [null, [Validators.required]],
      actorganization_name: [null, [Validators.required]],
      actorganization_name_en: [null, []],
      cdate: [null, []],
      mdate: [null, []],
    }) as IActorganizationFormGroup;    

  }

  ngOnInit(): void {
    this.getItems();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formActorganization.controls;
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
    this.actorganizationservice
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

  deleteItem(item: IActorganization) {
    this.itemSelected = item;
  }
  submitDelete(){
    var id = this.itemSelected?.actorganization_id;
    this.actorganizationservice.delete(id).subscribe({
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
    this.formActorganization.reset();
  }
  submitAddnew(){
    const datas = this.formActorganization.getRawValue();
    this.actorganizationservice.create(datas).subscribe({
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
  
  updateItem(item: IActorganization) {
    this.formActorganization.patchValue(item);
  }
  submitUpdate(){
    const datas = this.formActorganization.getRawValue();
    this.actorganizationservice.update(datas).subscribe({
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

} // class
