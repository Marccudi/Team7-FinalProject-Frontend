import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  closeNav() {
    let mySidenav :HTMLElement = document.getElementById("mySidenav") !;
    let body :HTMLElement = document.getElementById("body") !;
    let subBar :HTMLElement = document.getElementById("sub-bar") !;
    mySidenav.setAttribute( "style", "padding:0vh; width:0px;");
    body.setAttribute( "style", "margin-left:0px;");
    subBar.setAttribute( "style", "margin-left:0px;");
  }

}
