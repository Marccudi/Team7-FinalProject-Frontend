import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-borrows-list',
  templateUrl: './borrows-list.component.html',
  styleUrls: ['./borrows-list.component.css']
})
export class BorrowsListComponent implements OnInit {

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
  closeNav() {
    let mySidenav :HTMLElement = document.getElementById("mySidenav") !;
    let body :HTMLElement = document.getElementById("body") !;
    let subBar :HTMLElement = document.getElementById("sub-bar") !;

    mySidenav.setAttribute( "style", "padding:0vh; width:0px;");
    body.setAttribute( "style", "margin-left:0px;");
    subBar.setAttribute( "style", "margin-left:0px;");
  }
}
