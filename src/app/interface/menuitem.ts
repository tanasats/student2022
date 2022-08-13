export interface IMenuItem {
    path: string;
    title: string;
    icon: string;
    class: string;
    extralink: boolean;
    submenu: IMenuItem[];
  }