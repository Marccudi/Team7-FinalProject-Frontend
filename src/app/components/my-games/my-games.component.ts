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
  activeGame:any;
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

  setActiveGame(game: any) {
    this.activeGame = game;
  }

  editar(idgame:string){
    this.router.navigate(["juego-editar/"+idgame]);
  }

  borrar(){
    this.gameService.delete(this.activeGame.id, this.tokenStorage.getUser().id).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
    setTimeout(() =>{
      window.location.reload();
    },1000);

  }

}
