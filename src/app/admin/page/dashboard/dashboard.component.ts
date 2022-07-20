import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public datas = {
    account:[
    {email:"tanasat.s@msu.ac.th", password:"sudjing"},
    {email:"arnon.a", password:"1234"}
    ]
    };



    public vm = {
      menu : [
        {
            title: "aaa",
            item: [
                "AAA",
                "AAAA"
            ]
        },
        {
            title: "bbb",
            item: [
                "BBB",
                "BBBB"
            ]
        },
        {
            title: "ccc",
            item: [
                "CCC",
                "CCCC"
            ]
        }                
    ]};


  constructor() { }

  ngOnInit(): void {
    console.log(this.datas.account);
    const aaa=this.datas.account;

    const rs = aaa.filter((item,idx,arr)=>item.email=='tanasat.s@msu.ac.th'&&item.password=='sudjing');
    console.log(rs);
  }


}
