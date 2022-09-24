import { Component, OnInit } from '@angular/core';
import { GameService } from "../../service/game.service";
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  games:any;
  error:string = '';

  constructor(private router: Router, private gameService: GameService, private route :ActivatedRoute, private tokenStorage: TokenStorageService) {
    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    this.getAllGames();
    console.log('ID: '+this.tokenStorage.getUser().id);

  }

  getAllGames(){
    this.gameService.getAll()
    .subscribe(
      result => {
        this.games = result;
        this.searchGames();
      },
      error => {
        this.error = error;
        console.log(error);
      }
    );
  }

  searchGames(){
    const searchString = this.route.snapshot.paramMap.get("search");      //get url params
    if (searchString != null) {                                           //enter if url has search param
      let newGames : any = [];
      for (let index = 0; index < this.games.length; index++) {           //find all games that contain the search string
        const game = this.games[index];
        if (game.title.toLowerCase().lastIndexOf(searchString.toLowerCase()) > -1) {
          newGames.push(game);
        }
      }
      this.games = newGames;
    }
  }

}
