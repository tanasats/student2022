import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagetitle',
  templateUrl: './pagetitle.component.html',
  styleUrls: ['./pagetitle.component.css']
})
export class PagetitleComponent implements OnInit {
  @Input() _title?:string;
  @Input() _icon?:string;
  constructor() { }

  ngOnInit(): void {
  }

}
