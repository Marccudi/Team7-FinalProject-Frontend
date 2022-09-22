import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
    repeatPassword: null,
    firstName: null,
    lastName: null
  }
  user: any;
  id: number = 0;
  updatedUser = false;
  errorPassword = false;

  constructor(private userService: UserService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.id = this.tokenStorageService.getUser().id;
    this.getUser();
  }

  getUser(): void {
    this.userService.get(this.id).subscribe(
      data => {
        this.user = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateUser(): void {
    this.updatedUser = false;
    this.errorPassword = false;

    if (this.form.password === this.form.repeatPassword) {
      this.user.username = this.form.username;
      this.user.password = this.form.password;
      this.user.first_name = this.form.firstName;
      this.user.last_name = this.form.lastName;

      this.userService.update(this.id, this.user)
      this.updatedUser = true;
    } else {
      this.errorPassword = true;
    }

  }

}
