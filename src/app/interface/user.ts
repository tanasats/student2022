export interface IUser {
  userid: number,
  username: string,
  password: string,
  displayname: string,
  email: string,
  roles: { 
      roleid: number,
      rolename: string,
      rolecode: string }[],
  cdate: string,
  mdate: string,
} 