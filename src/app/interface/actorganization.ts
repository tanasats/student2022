import { AbstractControl, FormGroup } from "@angular/forms";

export interface IActorganization {
        actorganization_id:number,
        actorganization_code:string,
        actorganization_name:string,
        actorganization_name_en:string,
        cdate:string,
        mdate:string,
}
export interface IActorganizationFormGroup extends FormGroup {
        value: IActorganization;
        controls: {
          actorganization_id: AbstractControl;
          actorganization_code: AbstractControl;
          actorganization_name: AbstractControl;
          actorganization_name_en: AbstractControl;
          cdate:  AbstractControl;
          mdate:  AbstractControl;
        };
      }