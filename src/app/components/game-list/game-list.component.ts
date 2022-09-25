import { Component, OnInit } from '@angular/core';
import { GameService } from "../../service/game.service";
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Game } from 'src/app/models/game';
import { filter } from 'rxjs/operators';
import { GameHaveGenreService } from 'src/app/service/game-have-genre.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  games: any;
  error: string = '';

  gameDevelopers: string[] = [];  //Data to pass to the side bar
  gameGenres: string[] = [];
  gamePlatforms: string[] = [];

  constructor(private router: Router, private gameService: GameService, private route: ActivatedRoute, private tokenStorage: TokenStorageService, private gameHaveGenreService: GameHaveGenreService) {
    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.getAllGames();
    console.log('ID: ' + this.tokenStorage.getUser().id);

  }

  getAllGames() {
    this.gameService.getAll()
      .subscribe(
        result => {
          this.games = result;
          this.filterGames();
        },
        error => {
          this.error = error;
          console.log(error);
        }
      );
  }

  filterGames() {
    let searchString = "";
    let genreFilter = "";
    let developerFilter = "";
    let platformFilter = "";
    this.route.queryParams.subscribe(params => {
      searchString = params["search"];
      genreFilter = params["genre"];
      developerFilter = params["developer"];
      platformFilter = params["platform"];

      if (searchString != null) {                                           //enter if url has search param
        this.searchGames(searchString);
      }
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
      

      console.log("gameDeveloper ->");
      console.log(this.gameDevelopers);
    })
  }

  searchGames(searchString: string) {
    let newGames: any = [];
    for (let index = 0; index < this.games.length; index++) {           //find all games that contain the search string
      const game = this.games[index];
      if (game.title.toLowerCase().lastIndexOf(searchString.toLowerCase()) > -1) {
        newGames.push(game);
      }
    }
    this.games = newGames;
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
