import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameHaveGenreService } from 'src/app/service/game-have-genre.service';
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
  
  gameDevelopers: string[] = [];  //Data to pass to the side bar
  gameGenres: string[] = [];
  gamePlatforms: string[] = [];

  constructor(private router: Router, private gameService: GameService, private route :ActivatedRoute, private tokenStorage: TokenStorageService, private gameHaveGenreService: GameHaveGenreService) { }

  ngOnInit(): void {
    this.getGamesFromUser();
  }

  getGamesFromUser(){
    this.gameService.getUserGames(this.tokenStorage.getUser().id+'')
    .subscribe(
      result => {
        this.games = result;
        console.log(result);
        
        this.saveGameDevelopers();
        this.saveGameGenres();
        this.saveGamePlatforms();
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

  saveGamePlatforms() {
    for (let index = 0; index < this.games.length; index++) {
      const game = this.games[index];
      if (this.games.indexOf(game.platform.name) == -1) {
        this.gamePlatforms.push(game.platform.name);
      }
    }
  }

  saveGameDevelopers() {
    for (let index = 0; index < this.games.length; index++) {
      const game = this.games[index];
      if (this.games.indexOf(game.developer.name) == -1) {
        this.gameDevelopers.push(game.developer.name);
      }
    }
  }

  saveGameGenres() {
    for (let index = 0; index < this.games.length; index++) {
      const game = this.games[index];
      this.gameHaveGenreService.getGenresXGame(game.id).subscribe(data => {
        for (let index = 0; index < data.length; index++) {
          const gameHaveGenre = data[index];
          if (this.gameGenres.indexOf(gameHaveGenre.genre.name) == -1) {
            this.gameGenres.push(gameHaveGenre.genre.name);
          }
        }
      });
    }
  }

}
