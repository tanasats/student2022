import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  hideSideBar: boolean = false;
  constructor() { }

  toggleSideBar(): void {
    this.hideSideBar = !this.hideSideBar;
    console.log("toggle side nav ",this.hideSideBar);
  }
}
