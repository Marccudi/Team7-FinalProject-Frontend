import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Input() developers = [""];
  @Input() genres = [""];
  @Input() platforms = [""];

  prevSelGenre = "";
  prevSelPlatform = "";
  prevSelDeveloper = "";

  url: any;

  constructor(private route :ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    this.url = this.route.snapshot.url.toString();
    if (this.url=="inicio") {
      console.log("Som al inicio");
    }else if (this.url=="mis-juegos"){
      console.log("Som a mis-juegos");
    }else if (this.url=="mis-prestamos") {
      console.log("Som a mis-prestamos");
    }

    this.route.queryParams.subscribe(params => {
      this.prevSelGenre = params["genre"];
      this.prevSelPlatform = params["platform"];
      this.prevSelDeveloper = params["developer"];
    });

  }

  closeNav() {
    let mySidenav :HTMLElement = document.getElementById("mySidenav") !;
    let body :HTMLElement = document.getElementById("body") !;
    let subBar :HTMLElement = document.getElementById("sub-bar") !;
    mySidenav.setAttribute( "style", "padding:0vh; width:0px;");
    body.setAttribute( "style", "margin-left:0px;");
    subBar.setAttribute( "style", "margin-left:0px;");
  }

  onChangeGenre(genre:any, event :any) {
      this.router.navigate([this.url], { queryParams: {genre: genre}, queryParamsHandling: "merge" });
  }

  onChangeDeveloper(developer:any, event :any) {
      this.router.navigate([this.url], { queryParams: {developer: developer}, queryParamsHandling: "merge" });
  }

  onChangePlatform(platform:any, event :any) {
      this.router.navigate([this.url], { queryParams: {platform: platform}, queryParamsHandling: "merge" });
  }

}
