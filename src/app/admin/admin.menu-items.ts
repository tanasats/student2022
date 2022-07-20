export interface IMenuItems {
    path: string;
    title: string;
    icon: string;
    class: string;
    extralink: boolean;
    submenu: IMenuItems[];
  }

export const MenuItems: IMenuItems[] = [
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
