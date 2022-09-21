import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user?: User;
  id: number = 11;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
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
    this.user!.last_name = "test4";
    this.userService.update(this.id, this.user);
  }

}
