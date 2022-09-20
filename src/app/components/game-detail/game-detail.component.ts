import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameHaveGenreService } from '../../service/game-have-genre.service';
import { Game } from '../../models/game';
import { GameService } from '../../service/game.service';
import { GameHaveGenre } from '../../models/game-have-genre';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  currentGame: Game = {
    id: '',
    title: '',
    image:'',
    duration: '',
    yearReleased: '',
    ageCalification: '',
    description: '',
    dateInserted: '',
    enabled: '',
    borrowed: '',
    developer: '',
    platform: ''
  };

  genres: any;
  message = '';
  id = '';

  constructor(private route :ActivatedRoute, private gameService: GameService, private router: Router, private gameHaveGenreService: GameHaveGenreService) { }

  ngOnInit(): void {
    this.message='';
    this.id = this.route.snapshot.params['id'];
    this.getGame(this.id);
    this.getGenresXGame(this.id);
  }

  getGame(id: string):void{
    this.gameService.get(id)
    .subscribe(
      data => {
        this.currentGame = data;
        console.log(this.currentGame);
      },
      error => {
        console.log(error);
    });
  }

  getGenresXGame(id: string):void{
    this.gameHaveGenreService.getGenresXGame(id)
      .subscribe(
        data => {
          this.genres = data;
          console.log(this.genres);
        },
        error => {
          console.log(error);
      });
  }

}
