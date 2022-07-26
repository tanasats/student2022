
import { AppdataService } from 'src/app/service/appdata.service';
import { ActorganizationService } from 'src/app/service/actorganization.service';
import { ActtypeService } from 'src/app/service/acttype.service';
import { FacultyService } from 'src/app/service/faculty.service';
import { ActivityService } from 'src/app/service/activity.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';
import { Location } from '@angular/common';
import { IOption } from 'src/app/interface/option';
import {
  NgbDateStruct,
  NgbCalendar, 
  NgbDatepickerI18n,
  NgbCalendarBuddhist
} from '@ng-bootstrap/ng-bootstrap';
import localeThai from '@angular/common/locales/th';
import { getLocaleDayNames, FormStyle, TranslationWidth, getLocaleMonthNames, formatDate, registerLocaleData } from '@angular/common';

@Injectable()
export class NgbDatepickerI18nBuddhist extends NgbDatepickerI18n {
  private _locale = 'th';
  private _weekdaysShort: readonly string[];
  private _monthsShort: readonly string[];
  private _monthsFull: readonly string[];
  constructor() {
    super();
    registerLocaleData(localeThai);

    const weekdaysStartingOnSunday = getLocaleDayNames(this._locale, FormStyle.Standalone, TranslationWidth.Short);
    this._weekdaysShort = weekdaysStartingOnSunday.map((day, index) => weekdaysStartingOnSunday[(index + 1) % 7]);

    this._monthsShort = getLocaleMonthNames(this._locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
    this._monthsFull = getLocaleMonthNames(this._locale, FormStyle.Standalone, TranslationWidth.Wide);
  }

  getMonthShortName(month: number): string { return this._monthsShort[month - 1] || ''; }

  getMonthFullName(month: number): string { return this._monthsFull[month - 1] || ''; }

  getWeekdayLabel(weekday: number) {
    return this._weekdaysShort[weekday - 1] || '';
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return formatDate(jsDate, 'fullDate', this._locale);
  }

  override getYearNumerals(year: number): string { return String(year); }
}


// interface Movie {
//   name: string;
//   selected: boolean;
//   disabled: boolean;
//   movieCollection?: Movie[];
// }


@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.css'],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarBuddhist },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nBuddhist },
  ],
})

export class ActivityCreateComponent implements OnInit {
  public model?: NgbDateStruct;
  public formActivity: FormGroup;
  public optionFaculty: IOption[] = [];
  public optionActtype: IOption[] = [];
  public optionActorganization: IOption[] = [];
  public masterOptionFaculty: boolean = false;
  

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


  constructor(
    private appdataService: AppdataService,
    private activityService: ActivityService,
    private acttypeService: ActtypeService,
    private actorganizationService: ActorganizationService,
    private facultyService: FacultyService,
    private formBuilder: FormBuilder,
    private notifyService: NotificationService,
    private location: Location
  ) {
    this.initForm();
    this.formActivity = this.formBuilder.group({
      activity_id: [null, []],
      activity_code: [null, []],
      activity_name: [null, [Validators.required]],
      activity_year:[this.appdataService.acadyear,[]],
      activity_term:[null,[]],
      actorganization_id:[null,[]],
      actowner_id:[null,[]],
      acttype_id:[null,[]],
      activity_place:[null,[]],
      activity_description:[null,[]],
      activity_dateform:[null,[]],
      activity_dateto:[null,[]],
      activity_faculty:[null,[]],
      activity_receive:[null,[Validators.required, Validators.pattern("^[0-9]*$")]],
      activity_budget_source:[null,[]],
      activity_budget_init:[null,[Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      activity_budget_used:[null,[Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      activity_statuscode:[0,[]],
      cdate: [null, []],
      mdate: [null, []],
    });
  } //constructor
  get f(): { [key: string]: AbstractControl } {
    return this.formActivity.controls;
  }
  ngOnInit(): void { 
  }

  onSubmit() {
    if (this.formActivity.valid) {
      let datas = this.formActivity.getRawValue();    
      if(datas.activity_dateform){
        let y = datas.activity_dateform.year-543;
        let m = this.padZeros(datas.activity_dateform.month,2);
        let d = this.padZeros(datas.activity_dateform.day,2);
        datas.activity_dateform= y+"-"+m+"-"+d;
      } 
      if(datas.activity_dateto){
        let y = datas.activity_dateto.year-543;
        let m = this.padZeros(datas.activity_dateto.month,2);
        let d = this.padZeros(datas.activity_dateto.day,2);
        datas.activity_dateto= y+"-"+m+"-"+d;
      } 
      let arrfaculty = JSON.stringify(this.optionFaculty.filter(item=>{return item.isSelected==true}).map(item=>{return item.value}));
      datas.activity_faculty=arrfaculty;
      console.log(datas);
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
    this.actorganizationService.getOption().subscribe({
      next: (res) => {
        this.optionActorganization = res;
      },
      error: (err) => {
        console.log('err getOptionActtype=', err);
      },
    });
  }// initForm()


  changeMasterFaculty(){
    this.optionFaculty.forEach(item =>{ item.isSelected=this.masterOptionFaculty;});
  }
  changeFaculty(e:any){
    console.log(e.target.checked);
    console.log(this.optionFaculty);
    const all_isSelected_true = this.optionFaculty.every((item)=>{
      // item.isSelect has 3 status undefined,false,true
      return item.isSelected==true
    });
    this.masterOptionFaculty=all_isSelected_true;
  }

  padZeros(num: number, totalLength: number): string {
    return String(num).padStart(totalLength, '0');
  }

}//class
