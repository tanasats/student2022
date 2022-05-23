import { ActtypeService } from 'src/app/service/acttype.service';
import { FacultyService } from './../../../service/faculty.service';
import { ActivityService } from 'src/app/service/activity.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';
import { Location } from '@angular/common';

// interface Movie {
//   name: string;
//   selected: boolean;
//   disabled: boolean;
//   movieCollection?: Movie[];
// }
interface IOption {
  value: string;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.css'],
})
export class ActivityCreateComponent implements OnInit {
  public formActivity: FormGroup;

  public optionFaculty: IOption[] = [];
  public optionActtype: IOption[] = [];

  // public movies: Movie = {
  //   name: 'Dynamic Movie List',
  //   selected: false,
  //   disabled: false,
  //   movieCollection: [
  //     { name: 'Black Panther', selected: false, disabled: false },
  //     { name: 'Avengers: Endgame', selected: false, disabled: false },
  //     {
  //       name: 'Mission: Impossible - Fallout',
  //       selected: false,
  //       disabled: false,
  //     },
  //     {
  //       name: 'Spider-Man: Into the Spider-Verse',
  //       selected: false,
  //       disabled: false,
  //     },
  //     { name: 'Mad Max: Fury Road', selected: false, disabled: false },
  //     { name: 'Wonder Woman', selected: false, disabled: false },
  //   ],
  // };
  // public optionFaculty: IOption[] = [
  //   {
  //     value: '1',
  //     name: 'คณะวิศวกรรมศาสตร์',
  //     selected: false,
  //   },
  //   {
  //     value: '2',
  //     name: 'คณะเทคโนโลยีสารสนเทศ',
  //     selected: false,
  //   },
  //   {
  //     value: '3',
  //     name: 'คณะการบัญชีและการจัดการ',
  //     selected: false,
  //   },
  // ];

  constructor(
    private activityService: ActivityService,
    private acttypeService: ActtypeService,
    private facultyService: FacultyService,
    private formBuilder: FormBuilder,
    private notifyService: NotificationService,
    private location: Location
  ) {
    this.initForm();
    this.formActivity = this.formBuilder.group({
      activityid: [null, []],
      activitycode: [null, []],
      activityname: [null, [Validators.required]],
      acttypeid:[null,[]],
      cdate: [null, []],
      mdate: [null, []],
    });
  } //constructor

  ngOnInit(): void { }

  onSubmit() {
    if (this.formActivity.valid) {
      let datas = this.formActivity.getRawValue();
      this.activityService.create(datas).subscribe({
        next: (v) => {
          console.log(v);
          this.notifyService.show('success', 'เพิ่มข้อมูลแล้ว', '');
          //this.formActtype.reset();
          this.location.back();
        },
        error: (e) => {
          console.log(e);
          this.notifyService.show('error', e, '');
        },
      });
    }
  }

  initForm(){
    this.facultyService.getOption().subscribe({
      next: (res) => {
        this.optionFaculty = res;
      },
      error: (err) => {
        console.log('err getOptionFaclulty=', err);
      },
    });
    this.acttypeService.getOption().subscribe({
      next: (res) => {
        this.optionActtype = res;
      },
      error: (err) => {
        console.log('err getOptionActtype=', err);
      },
    });
  }// initForm()

}//class
