import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Input() developers = [""];
  @Input() genres = [""];
  @Input() platforms = [""];

  constructor(private route :ActivatedRoute ) { }

  ngOnInit(): void {
    let url = this.route.snapshot.url.toString();
    if (url=="inicio") {
      console.log("Som al inicio");
    }else if (url=="mis-juegos"){
      console.log("Som a mis-juegos");
    }else if (url=="mis-prestamos") {
      console.log("Som a mis-prestamos");
    }

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
