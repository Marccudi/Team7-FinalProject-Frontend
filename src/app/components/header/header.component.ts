import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false
  username?:string

  constructor (private tokenStorageService: TokenStorageService, private router:Router) { }

  ngOnInit():void {
    this.isLoggedIn=!!this.tokenStorageService.getToken()

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser()

      this.username = user.username
    }
  }

  logout():void{
    this.tokenStorageService.signOut()
    window.location.reload();
    this.router.navigate(['login'])
  }
}
