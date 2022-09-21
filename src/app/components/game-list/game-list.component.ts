import { Component, OnInit } from '@angular/core';
import { GameService } from "../../service/game.service";
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  games:any;
  error:string = '';

  user:any = {
    id: 0,
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: ''
  };

  constructor(private router: Router, private gameService: GameService, private route :ActivatedRoute, private userService :UserService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.getAllGames();
    this. getUsername();
  }

  getAllGames(){
    this.gameService.getAll()
    .subscribe(
      result => {
        this.games = result;
      },
      error => {
        this.error = error;
        console.log(error);
      }
    );
  }

  getUsername():void{
    this.userService.getUserbyName(this.tokenStorage.getUser())
    .subscribe(
      data => {
        this.user = data;
        console.log(this.user);
      },
      error => {
        console.log(error);
      });
  }
}
