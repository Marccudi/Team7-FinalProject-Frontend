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

  constructor(private router: Router, private gameService: GameService, private route :ActivatedRoute, private tokenStorage: TokenStorageService, private gameHaveGenreService: GameHaveGenreService) { 
    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.getGamesFromUser();
  }

  getGamesFromUser(){
    this.gameService.getUserGames(this.tokenStorage.getUser().id+'')
    .subscribe(
      result => {
        this.games = result;
        console.log(result);
        
        this.filterGames();
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
        if(!this.gamePlatforms.includes(game.platform.name)){
          this.gamePlatforms.push(game.platform.name);
        }
    }
  }

  saveGameDevelopers() {
    for (let index = 0; index < this.games.length; index++) {
      const game = this.games[index];
        if(!this.gameDevelopers.includes(game.developer.name)) {
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

  filterGames() {
    let genreFilter = "";
    let developerFilter = "";
    let platformFilter = "";
    this.route.queryParams.subscribe(params => {
      genreFilter = params["genre"];
      developerFilter = params["developer"];
      platformFilter = params["platform"];

      if (genreFilter != null) {
        this.filterGenres(genreFilter);
      }
      if(platformFilter != null){
        this.filterPlatforms(platformFilter);
      }
      if (developerFilter != null) {
        this.filterDevelopers(developerFilter);
      }

      setTimeout(() => {            //Wait until games have loaded
        this.saveGameDevelopers();
        this.saveGameGenres();
        this.saveGamePlatforms();
      }, 500);
    })
  }

  filterGenres(genreFilter: string) {
    let newGames: any = [];
    for (let index = 0; index < this.games.length; index++) {           //find all games that contain the search string
      const game = this.games[index];
      this.gameHaveGenreService.getGenresXGame(game.id).subscribe(data => {
        for (let index = 0; index < data.length; index++) {
          const gameHaveGenre = data[index];
          if (gameHaveGenre.genre.name.indexOf(genreFilter) > -1) {
            newGames.push(game);
          }
        }
      });
    }
    this.games = newGames;
  }

  filterPlatforms(platformFilter: string) {
    let newGames: any = [];
    for (let index = 0; index < this.games.length; index++) {           //find all games that contain the search string
      const game = this.games[index];
      if (game.platform.name.lastIndexOf(platformFilter) > -1) {
        newGames.push(game);
      }
    }
    this.games = newGames;
  }

  filterDevelopers(developerFilter: string) {
    let newGames: any = [];
    for (let index = 0; index < this.games.length; index++) {           //find all games that contain the search string
      const game = this.games[index];
      if (game.developer.name.lastIndexOf(developerFilter) > -1) {
        newGames.push(game);
      }
    }
    this.games = newGames;
  }

}
