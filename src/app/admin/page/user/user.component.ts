import { IUser } from './../../../interface/user';
import { UserService } from './../../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
//import { faCirclePlus,faPencil,faTrash,faMagnifyingGlass,faAdd,faRefresh } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public items: IUser[]=[];
  public closeResult:string="";
  // public faCirclePlus = faCirclePlus;
  // public faPencil = faPencil;
  // public faTrash = faTrash;
  // public faAdd = faAdd;
  // public faMagnifyingGlass=faMagnifyingGlass;
  // public faRefresh=faRefresh;

  constructor(
    private userService: UserService,
    private notifyService: NotificationService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.userService.getUser().subscribe({
      next: (v) => {
        this.items = v;
      },
      error: (e) => {
        this.notifyService.show('error',e,'');
      }
    });
  }

  onDelete(id: any) {
    console.log("onDelete("+id+")")
    this.userService.delete(id).subscribe({
      next:(v) =>{
        console.log(v);
        if(v.affectedRows == 1){
          this.notifyService.show('success','ลบข้อมูลแล้ว','');
          this.getItems();
        }
      },
      error:(e) =>{
        console.log("onDelete() error:",e);
        this.notifyService.show('error','ผิดพลาด:'+e,'');
      },
      complete:() =>{  }
    });
  }

  deleteItem(item: IUser) {
    const modalRef = this.modalService.open(ConfirmDialogComponent);
    modalRef.componentInstance.title = "ยืนยันลบข้อมูล";
    modalRef.componentInstance.content = "รหัส " + item.userid + " " + item.username;
    modalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        if (result == "Ok") {
          this.items.forEach((el, index) => {
            if (el.userid == item.userid) {
              this.onDelete(item.userid);
            }
          });
        }
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }






}
