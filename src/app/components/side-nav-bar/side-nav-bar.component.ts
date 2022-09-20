import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openNav() {
    let mySidenav :HTMLElement = document.getElementById("mySidenav") !;
    let body :HTMLElement = document.getElementById("body") !;
    let subBar :HTMLElement = document.getElementById("sub-bar") !;
    mySidenav.setAttribute( "style", "padding:10vh 2vh 2vh 2vh; width:250px;");
    body.setAttribute( "style", "margin-left:300px;");
    subBar.setAttribute( "style", "margin-left:250px;");
  }

}
