import { IMenuItem } from "src/app/interface/menuitem";


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

export const admin_menu_items: IMenuItem[] = [
    {
      path: 'dashboard',
      title: 'แผงควบคุม',
      icon: 'bi bi-speedometer2',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: 'activity',
      title: 'รายการกิจกรรม',
      icon: 'bi bi-bell',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: 'user',
      title: 'ผู้ใช้งาน',
      icon: 'bi bi-patch-check',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: 'acttype',
      title: 'ประเภทกิจกรรม',
      icon: 'bi bi-patch-check',
      class: '',
      extralink: false,
      submenu: []
    },  
    {
      path: 'actorganization',
      title: 'องค์กรที่จัดกิจกรรม',
      icon: 'bi bi-patch-check',
      class: '',
      extralink: false,
      submenu: []
    }, 
    {
      path: 'faculty',
      title: 'คณะหน่วยงาน',
      icon: 'bi bi-patch-check',
      class: '',
      extralink: false,
      submenu: []
    },  
    {
      path: 'test',
      title: 'ทดสอบ',
      icon: 'bi bi-patch-check',
      class: '',
      extralink: false,
      submenu: []
    },  
  ];
  