import { AbstractControl, FormGroup } from "@angular/forms";

export interface IActivity {
    activity_id:number,
    activity_code:string,
    activity_name:string,
   
    activity_year	:number,
    activity_term	:number,
    actorganization_id	:number,
    actowner_id	:number,
    acttype_id	:number,
    activity_place	:string,
    activity_description	:string,
    activity_dateform	:string,
    activity_dateto	:string,
    activity_faculty	:string,
    activity_receive	:number,
    activity_budget_source	:number,
    activity_budget_init	:number,
    activity_budget_used	:number,

    activity_statuscode:string,
    cdate: string,
    mdate: string,
}
export interface IActivityFormGroup extends FormGroup {
    value: IActivity;
    controls: {
      activity_id: AbstractControl;
      activity_code: AbstractControl;
      activity_name: AbstractControl;
      
      activity_year	: AbstractControl;
      activity_term	: AbstractControl;
      actorganization_id	: AbstractControl;
      actowner_id	: AbstractControl;
      acttype_id	: AbstractControl;
      activity_place	: AbstractControl;
      activity_description	: AbstractControl;
      activity_dateform	: AbstractControl;
      activity_dateto	: AbstractControl;
      activity_faculty	: AbstractControl;
      activity_receive	: AbstractControl;
      activity_budget_source	: AbstractControl;
      activity_budget_init	: AbstractControl;
      activity_budget_used	: AbstractControl;

      activity_statuscode: AbstractControl;
      cdate:  AbstractControl;
      mdate:  AbstractControl;
    };
  }
