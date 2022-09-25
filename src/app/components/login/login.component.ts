import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:any = {
    username:null,
    password:null
  }

  user:any;

  isLoggedIn = false
  isLoginFailed = false
  errorMessage=''
  roles: string[]=[]

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router:Router, private userService :UserService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn= true
      this.roles = this.tokenStorage.getUser().roles
      this.router.navigate(['inicio']);
    }


  }

  onSubmit():void{

    const { username, password } = this.form
    console.log('onsubmit');

    this.authService.login(username, password)
    .subscribe(
      data => {
        this.tokenStorage.saveToken(data.token)

        this.getUsername();

        this.isLoginFailed = false
        this.isLoggedIn = true
        this.roles = this.tokenStorage.getUser().role
        setTimeout(() => {
          this.router.navigate(['inicio']);
        }, 2000);

      },
        err => {
          this.isLoginFailed=true
          console.log(err);
        }
      )
  }

  getUsername():void{
    this.userService.getUserbyName(this.form.username)
    .subscribe(
      data => {
        this.user = data;
        this.tokenStorage.saveUser(data);
      },
      error => {
        console.log(error);
      });
  }

}
