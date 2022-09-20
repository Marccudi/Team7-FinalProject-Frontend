import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

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
  isLoggedIn = false
  isLoginFailed = false
  errorMessage=''
  roles: string[]=[]

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn= true
      this.roles = this.tokenStorage.getUser().roles
    }
  }

  onSubmit():void{
    const { username, password } = this.form
    console.log('onsubmit');

    this.authService.login(username, password)
    .subscribe(
      data => {
        this.tokenStorage.saveToken(data.token)
        this.tokenStorage.saveUser(data)
        console.log(this.tokenStorage.getToken());

        this.isLoginFailed = false
        this.isLoggedIn = true
        this.roles = this.tokenStorage.getUser().role
        window.location.reload()


      },
        err => {
          this.errorMessage = err.error.message
          this.isLoginFailed=true
          console.log(err);

        }
      )

  }

}
