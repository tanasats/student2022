export interface IUser {
  user_id: number,
  username: string,
  password: string,
  displayname: string,
  email: string,
  roles: { 
      role_id: number,
      role_name: string,
      role_code: string }[],
  cdate: string,
  mdate: string,
} 