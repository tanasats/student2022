import { ICurrentuser } from './../interface/currentuser';
import { IUser } from 'src/app/interface/user';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  public _currentuser: ICurrentuser;
  //public username:String='';
  //public _authorized:Boolean=false;

  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();
  getEmitter() {
    return this.fireIsLoggedIn;
  }

  constructor() {
    this._currentuser = this.initCurrentUser;
  }

  private get initCurrentUser(): ICurrentuser {
    return {
      islogin: false,
      user_id:0,
      username: '',
      displayname: '',
      email: '',
      role:'',
      roles:[],
    };
  }

  get username() {
    return this._currentuser.username;
  }
  set username(username) { 
    this._currentuser.username = username;
  }
  get user_id() {
    return this._currentuser.user_id;
  }
  set user_id(user_id) { 
    this._currentuser.user_id = user_id;
  }
  get displayname() {
    return this._currentuser.displayname;
  }
  set displayname(displayname) {
    this._currentuser.displayname = displayname;
  }
  get email() {
    return this._currentuser.email;
  }
  set email(email) {
    this._currentuser.email = email;
  }
  get role(){
    return this._currentuser.role;
  }
  set role(rolecode){
    this._currentuser.role=rolecode;
  }
  get roles(){
    return this._currentuser.roles;
  }
  set roles(roles:any[]){
    this._currentuser.roles=roles;
  }
  get islogin() {
    return this._currentuser.islogin;
  }
  set islogin(bool: boolean) {
    this._currentuser.islogin = bool;
    this.fireIsLoggedIn.emit(this._currentuser);
  }
  get info(){
    return this._currentuser;
  }

  logout() {
    this._currentuser = this.initCurrentUser;
    localStorage.removeItem('access-token'); //localStorage.clear();
    this.fireIsLoggedIn.emit(this._currentuser);
  }
} //class
