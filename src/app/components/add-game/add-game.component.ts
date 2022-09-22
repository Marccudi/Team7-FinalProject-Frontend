import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Game } from 'src/app/models/game';
import { Developer } from 'src/app/models/developer';
import { Genre } from 'src/app/models/genre';
import { Platform } from 'src/app/models/platform';

import { TokenStorageService } from 'src/app/service/token-storage.service';
import { GameService } from 'src/app/service/game.service';
import { DeveloperService } from 'src/app/service/developer.service';
import { GenreService } from 'src/app/service/genre.service';
import { PlatformService } from 'src/app/service/platform.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  genres:any;
  developers:any;
  platforms:any;

  developerModel: Developer ={
    id:'',
    name: ''
  }
  genreModel: Genre ={
    id:'',
    name: ''
  }
  platformModel: Platform ={
    id:'',
    name: ''
  }

  game: Game = {
    id: '',
    title: '',
    image:'',
    duration: '',
    yearReleased: '',
    ageCalification: '',
    description: '',
    dateInserted: '',
    enabled: '',
    developer: '',
    platform: this.platformModel.name,
    owner:''
  };

  generos:string='';
  submitted = false;
  date:any = new Date();

  constructor(private gameService: GameService,
              private tokenStorage: TokenStorageService,
              private developerService: DeveloperService,
              private genreService: GenreService,
              private platformService: PlatformService) {
  }

  ngOnInit(): void {
    this.listarGeneros();
    this.listarPlatforms();
    this.listarDevelopers();


  }

  saveGame():void{
    const data = {
      title: this.game.title,
      image: this.game.image,
      duration: this.game.duration,
      yearReleased: this.game.yearReleased,
      ageCalification: this.game.ageCalification,
      description: this.game.description,
      dateInserted: this.formatDate(this.date),
      enabled: true,
      developer: this.game.developer,
      platform: this.platformModel,
      owner: this.tokenStorage.getUser(),
    }
    console.log(data)
    /*
    this.gameService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted= true;
        },
        error => {
          console.log(error);
        });
        */
  }

  listarGeneros():void{

    this.genreService.getAll()
    .subscribe(
      data => {
        this.genres = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  listarPlatforms():void{
    this.platformService.getAll()
      .subscribe(
        data => {
          this.platforms = data;
          console.log(data);
        },
        error => {
          console.log(error);
    });
  }

  listarDevelopers():void{
    this.developerService.getAll()
      .subscribe(
        data => {
          this.developers = data;
          console.log(data);
        },
        error => {
          console.log(error);
    });
  }

  formatDate(date:Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

  radioChangeHandler( event:any){
    this.platformModel=event.target.value;
  }

}
