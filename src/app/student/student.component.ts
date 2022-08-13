import { Component, OnInit } from '@angular/core';
import { IMenuItem } from '../interface/menuitem';
import { student_menu_items } from './student.menu-items';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  public student_menu_items:IMenuItem[]=student_menu_items

  constructor() { }

  ngOnInit(): void {
  }

}
