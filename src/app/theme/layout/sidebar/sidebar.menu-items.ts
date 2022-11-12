import { IMenuItem } from "src/app/interface/menuitem";


export const student_menu_items: IMenuItem[] = [
  {
    path: 'student/dashboard',
    title: 'หน้าหลัก',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: 'student/activity',
    title: 'ลงทะเบียนกิจกรรม',
    icon: 'bi bi-bell',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: 'student/user',
    title: 'ตรวจสอบชั่วโมง',
    icon: 'bi bi-patch-check',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: 'student/profile',
    title: 'ข้อมูลส่วนตัว',
    icon: 'bi bi-patch-check',
    class: '',
    extralink: false,
    submenu: []
  },
];

export const admin_menu_items: IMenuItem[] = [
    {
      path: 'admin/dashboard',
      title: 'แผงควบคุม',
      icon: 'bi bi-speedometer2',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: 'admin/activity',
      title: 'รายการกิจกรรม',
      icon: 'bi bi-bell',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: 'admin/user',
      title: 'ผู้ใช้งาน',
      icon: 'bi bi-patch-check',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: 'admin/acttype',
      title: 'ประเภทกิจกรรม',
      icon: 'bi bi-patch-check',
      class: '',
      extralink: false,
      submenu: []
    },  
    {
      path: 'admin/actorganization',
      title: 'องค์กรที่จัดกิจกรรม',
      icon: 'bi bi-patch-check',
      class: '',
      extralink: false,
      submenu: []
    }, 
    {
      path: 'admin/faculty',
      title: 'คณะหน่วยงาน',
      icon: 'bi bi-patch-check',
      class: '',
      extralink: false,
      submenu: []
    },  
    {
      path: 'admin/test',
      title: 'ทดสอบ',
      icon: 'bi bi-patch-check',
      class: '',
      extralink: false,
      submenu: []
    },  
  ];
  