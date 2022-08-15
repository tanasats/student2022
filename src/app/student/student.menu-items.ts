import { IMenuItem } from "../interface/menuitem";

export const student_menu_items: IMenuItem[] = [
  {
    path: 'dashboard',
    title: 'หน้าหลัก',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: 'activity',
    title: 'ลงทะเบียนกิจกรรม',
    icon: 'bi bi-bell',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: 'user',
    title: 'ตรวจสอบชั่วโมง',
    icon: 'bi bi-patch-check',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: 'profile',
    title: 'ข้อมูลส่วนตัว',
    icon: 'bi bi-patch-check',
    class: '',
    extralink: false,
    submenu: []
  },
];
