import { FacultyService } from './../../../service/faculty.service';
import { ActivityService } from 'src/app/service/activity.service';
import { IActivity, IActivityFormGroup } from 'src/app/interface/activity';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';
import { Location } from '@angular/common';
import { IOption } from 'src/app/interface/option';
import { AppdataService } from 'src/app/service/appdata.service';
import { ActtypeService } from 'src/app/service/acttype.service';
import { ActorganizationService } from 'src/app/service/actorganization.service';

import {
  NgbDateStruct,
  NgbCalendar,
  NgbDatepickerI18n,
  NgbCalendarBuddhist,
} from '@ng-bootstrap/ng-bootstrap';
import localeThai from '@angular/common/locales/th';
import {
  getLocaleDayNames,
  FormStyle,
  TranslationWidth,
  getLocaleMonthNames,
  formatDate,
  registerLocaleData,
} from '@angular/common';
import {
  base64ToFile,
  ImageCroppedEvent,
  LoadedImage,
} from 'ngx-image-cropper';

@Injectable()
export class NgbDatepickerI18nBuddhist extends NgbDatepickerI18n {
  private _locale = 'th';
  private _weekdaysShort: readonly string[];
  private _monthsShort: readonly string[];
  private _monthsFull: readonly string[];
  constructor() {
    super();
    registerLocaleData(localeThai);

    const weekdaysStartingOnSunday = getLocaleDayNames(
      this._locale,
      FormStyle.Standalone,
      TranslationWidth.Short
    );
    this._weekdaysShort = weekdaysStartingOnSunday.map(
      (day, index) => weekdaysStartingOnSunday[(index + 1) % 7]
    );

    this._monthsShort = getLocaleMonthNames(
      this._locale,
      FormStyle.Standalone,
      TranslationWidth.Abbreviated
    );
    this._monthsFull = getLocaleMonthNames(
      this._locale,
      FormStyle.Standalone,
      TranslationWidth.Wide
    );
  }

  getMonthShortName(month: number): string {
    return this._monthsShort[month - 1] || '';
  }

  getMonthFullName(month: number): string {
    return this._monthsFull[month - 1] || '';
  }

  getWeekdayLabel(weekday: number) {
    return this._weekdaysShort[weekday - 1] || '';
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return formatDate(jsDate, 'fullDate', this._locale);
  }

  override getYearNumerals(year: number): string {
    return String(year);
  }
}

@Component({
  selector: 'app-activity-update',
  templateUrl: './activity-update.component.html',
  styleUrls: ['./activity-update.component.css'],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarBuddhist },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nBuddhist },
  ],
})
export class ActivityUpdateComponent implements OnInit {
  public optionFaculty: IOption[] = [];
  public optionActtype: IOption[] = [];
  public optionActorganization: IOption[] = [];
  public masterOptionFaculty: boolean = false;

  public item: IActivity;
  public itemID: number;
  public formActivity: FormGroup;
  public formUpload: FormGroup;

  constructor(
    private activityService: ActivityService,
    private appdataService: AppdataService,
    private acttypeService: ActtypeService,
    private facultyService: FacultyService,
    private actorganizationService: ActorganizationService,
    private formBuilder: FormBuilder,
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.item = history.state.data;
    this.itemID = this.route.snapshot.params['id'];

    this.formActivity = this.formBuilder.group({
      activity_id: [this.itemID, [Validators.required]],
      activity_code: [null, [Validators.required]],
      activity_name: [null, [Validators.required]],
      activity_year: [null, []],
      activity_term: [null, []],
      actorganization_id: [null, []],
      actowner_id: [null, []],
      acttype_id: [null, []],
      activity_place: [null, []],
      activity_description: [null, []],
      activity_dateform: [null, []],
      activity_dateto: [null, []],
      activity_faculty: [null, []],
      activity_receive: [null, []],
      activity_budget_source: [null, []],
      activity_budget_init: [null, []],
      activity_budget_used: [null, []],
      activity_statuscode: [0, []],
      cdate: [null, []],
      mdate: [null, []],
    }) as IActivityFormGroup;
    this.formUpload = this.formBuilder.group({
      file: [null, []],
      caption: [null, []],
    });
  } //constructor

  get f(): { [key: string]: AbstractControl } {
    return this.formActivity.controls;
  }

  ngOnInit(): void {
    this.initForm();
    this.formActivity.patchValue(this.item);
    this.formActivity.patchValue({
      activity_dateform: this.datetimeISO8601_ngbDatetimepickerThai(
        this.item.activity_dateform
      ),
    });
    this.formActivity.patchValue({
      activity_dateto: this.datetimeISO8601_ngbDatetimepickerThai(
        this.item.activity_dateto
      ),
    });

    this.formUpload.patchValue({ caption: this.item.activity_caption });
    //console.log(this.optionFaculty);
    //this.optionFaculty.every((element)=>{element.isSelected=true;})
  } //ngOnInit()

  initForm() {
    this.facultyService.getOption().subscribe({
      next: (res) => {
        this.optionFaculty = res;
        console.log('init', this.optionFaculty);
        console.log('data', this.item.activity_faculty); //<-- string
        const arrFaculty = JSON.parse(this.item.activity_faculty);
        console.log(arrFaculty);
        console.log('test-access:', arrFaculty.includes(30));

        this.optionFaculty.forEach((element) => {
          if (arrFaculty.includes(element.value)) {
            element.isSelected = true;
          }
        });
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
  } // initForm()

  onSubmit() {
    if (this.formActivity.valid) {
      this.formActivity.controls;
      let datas = this.formActivity.getRawValue();
      if (datas.activity_dateform) {
        let y = datas.activity_dateform.year - 543;
        let m = this.padZeros(datas.activity_dateform.month, 2);
        let d = this.padZeros(datas.activity_dateform.day, 2);
        datas.activity_dateform = y + '-' + m + '-' + d;
      }
      if (datas.activity_dateto) {
        let y = datas.activity_dateto.year - 543;
        let m = this.padZeros(datas.activity_dateto.month, 2);
        let d = this.padZeros(datas.activity_dateto.day, 2);
        datas.activity_dateto = y + '-' + m + '-' + d;
      }
      let arrfaculty = JSON.stringify(
        this.optionFaculty
          .filter((item) => {
            return item.isSelected == true;
          })
          .map((item) => {
            return item.value;
          })
      );
      datas.activity_faculty = arrfaculty;
      console.log('submit: ', datas);
      this.activityService.update(datas).subscribe({
        next: (v) => {
          this.formActivity.controls;
          console.log(v);
          if (v.affectedRows == 1) {
            this.notifyService.show('success', 'บันทึกการแก้ไขแล้ว', '');
            this.location.back();
          } else {
            this.notifyService.show('error', 'บันทึกการแก้ไขผิดพลาด', '');
          }
        },
        error: (e) => {
          console.log(e);
          this.notifyService.show('error', e, '');
        },
      });
    }
  }

  getItem() {
    console.log(this.itemID);
    this.activityService.getById(this.itemID).subscribe({
      next: ([v]) => {
        console.log(v);
        this.formActivity.patchValue(v);
        this.formActivity.patchValue({
          activity_dateform: this.datetimeISO8601_ngbDatetimepickerThai(
            v.activity_dateform
          ),
        });
        this.formActivity.patchValue({
          activity_dateto: this.datetimeISO8601_ngbDatetimepickerThai(
            v.activity_dateto
          ),
        });
      },
      error: (e) => {
        this.notifyService.show('error', e, '');
      },
    });
  }

  changeMasterFaculty() {
    this.optionFaculty.forEach((item) => {
      item.isSelected = this.masterOptionFaculty;
    });
  }
  changeFaculty() {
    console.log(
      this.optionFaculty.some((item) => {
        return item.isSelected == false;
      })
    );
    if (
      this.optionFaculty.some((item) => {
        return item.isSelected == false;
      })
    ) {
      this.masterOptionFaculty = false;
    } else {
      this.masterOptionFaculty = true;
    }
    // let test = this.optionFaculty.filter(item=>{return item.isSelected==true}).map(item=>{return item.value})
    // console.log('test=',test);
    // console.log(JSON.stringify(test));
  }
  padZeros(num: number, totalLength: number): string {
    return String(num).padStart(totalLength, '0');
  }

  datetimeISO8601_ngbDatetimepickerThai(isoDate: string) {
    let inputDate = new Date(isoDate);
    return {
      year: inputDate.getFullYear() + 543,
      month: inputDate.getMonth(),
      day: inputDate.getDate(),
    };
  }

  public imageChangedEvent: any = '';
  public croppedImage: any = ''; // cropped image in base64 format
  public fileToUpload: File = {} as File;
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    console.log('cropped action!!');
    //this.croppedImage = event.base64;
    //let File = base64ToFile(this.croppedImage); //File is type Blob
    //console.log('File:',File);
    //console.log(this.croppedImage);

    this.croppedImage = event.base64;
    this.fileToUpload = this.base64ToFile(
      event.base64,
      this.imageChangedEvent.target.files[0].name
    );
    return this.fileToUpload;
  }
  imageLoaded(image: LoadedImage) {
    //imageLoaded() {
    // show cropper
    //console.log("imageLoaded()",image);
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  onSubmitUpload() {
    console.log('submitUpload()');
    let formData: FormData = new FormData();
    let file: File = this.fileToUpload;
    let caption = this.formUpload.get('caption')?.value;

    formData.append('id', this.itemID.toString());
    if (file.size > 0) 
        formData.append('file', file, Date.now() + '.png');
    if (typeof caption === 'string') 
        formData.append('caption', caption);

    this.activityService.upload(formData).subscribe({
      next: (v) => {
        console.log('v=', v);
        this.notifyService.show('success', 'Upload Success', '');
      },
      error: (e) => {
        console.log('error:', e);
        this.notifyService.show('error', e.message, '');
      },
    });
  }

  base64ToFile(data: any, filename: string) {
    try {
      const arr = data.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    } catch (e) {
      return {} as File;
    }
  }





} //class
