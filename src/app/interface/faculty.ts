import { AbstractControl, FormGroup } from "@angular/forms";

export interface IFaculty {
    faculty_id:number,
    faculty_code:string,
    faculty_name:string,
    faculty_name_en:string,
    cdate: string,
    mdate: string,
}

export interface IFacultyFormGroup extends FormGroup {
    value: IFaculty;
    controls: {
        faculty_id:AbstractControl,
        faculty_code:AbstractControl,
        faculty_name:AbstractControl,
        faculty_name_en:AbstractControl,
        cdate: AbstractControl,
        mdate: AbstractControl,
    };
  }