import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/service/game.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.css']
})
export class MyGamesComponent implements OnInit {

  games:any;
  error:string = '';

  constructor(private router: Router, private gameService: GameService, private route :ActivatedRoute, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.getGamesFromUser();
  }

  getGamesFromUser(){
    this.gameService.getUserGames(this.tokenStorage.getUser().id+'')
    .subscribe(
      result => {
        this.games = result;
        console.log(result);
      },
      error => {
        this.error = error;
        console.log(error);
      }
    )
  }

  editar(idgame:string){}

  borrar(idgame:string){}

}
