import { Component, OnInit } from '@angular/core';
import { GameService } from "../../service/game.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  games:any;
  error:string = '';


  constructor(private router: Router, private gameService: GameService, private route :ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllGames();
  }

  getAllGames(){
    this.gameService.getAll()
    .subscribe(
      result => {
        this.games = result;
      },
      error => {
        this.error = error;
        console.log('error');
      }
    );
  }
}
