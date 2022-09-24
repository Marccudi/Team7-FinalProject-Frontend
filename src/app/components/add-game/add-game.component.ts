import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Game } from 'src/app/models/game';
import { Developer } from 'src/app/models/developer';
import { Genre } from 'src/app/models/genre';
import { Platform } from 'src/app/models/platform';
import { GameHaveGenre } from "../../models/game-have-genre";

import { TokenStorageService } from 'src/app/service/token-storage.service';
import { GameService } from 'src/app/service/game.service';
import { DeveloperService } from 'src/app/service/developer.service';
import { GenreService } from 'src/app/service/genre.service';
import { PlatformService } from 'src/app/service/platform.service';
import { GameHaveGenreService } from 'src/app/service/game-have-genre.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  genres:any;
  selectedGenres:any=[];
  developers:any;
  platforms:any;
  gameGenres: any;
  title = "Nuevo Juego";

  developerModel: Developer ={
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
    platform: this.platformModel,
    owner:''
  };


  generosString:string='';
  submitted = false;
  error = false;
  errortxt='';
  date:any = new Date();

  constructor(private gameService: GameService,
              private tokenStorage: TokenStorageService,
              private developerService: DeveloperService,
              private genreService: GenreService,
              private platformService: PlatformService,
              private router:Router,
              private gameHaveGenreService :GameHaveGenreService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.listarGeneros();
    this.listarPlatforms();
    this.listarDevelopers();

    const gameId = this.activatedRoute.snapshot.paramMap.get("id");
    if(gameId != null) {                                              //Initialize form data if url has an id
      this.title = "Actualizar juego";
      this.gameService.get(gameId).subscribe(
        data => {
          console.log(data);
          this.game = data;

          this.developerModel.id = this.game.developer.id;
          this.developerModel.name = this.game.developer.name;

          this.gameHaveGenreService.getGenresXGame(this.game.id).subscribe(
            data => {
              this.gameGenres = data;
              console.log(this.gameGenres);
              for (let index = 0; index < this.gameGenres.length; index++) {
                const gameGenre = this.gameGenres[index];
                this.generosString += gameGenre.genre.name + ";";
              }
            }, error => {
              console.log(error);
            }
          );
        }
      );
    }
  }

  saveGame():void{
    this.getPlataforma(this.game.platform.id);

    setTimeout(() => {
      const data = {
        title: this.game.title,
        image: this.game.image,
        duration: this.game.duration,
        yearReleased: this.game.yearReleased,
        ageCalification: this.game.ageCalification,
        description: this.game.description,
        dateInserted: this.formatDate(this.date),
        enabled: true,
        developer: this.developerModel,
        platform: this.platformModel,
        owner: this.tokenStorage.getUser(),
      }

      if (this.comprovarForm(data)) {
        console.log(data)
        this.gameService.create(data)
          .subscribe(
            response => {
              console.log(response);
              this.game=response;
              this.submitted= true;
              this.error=false;
            },
            error => {
              this.errortxt='Ha habido algún error';
              this.error=true;
              this.submitted=false;
              console.log(error);
            });
        setTimeout(() => {
          this.selectedGenres.forEach((genre : any) => {
            let gameHaveGenreData = {
                game: this.game,
                genre: genre
            };
            console.log(gameHaveGenreData)
            this.gameHaveGenreService.create(gameHaveGenreData)
              .subscribe(
                response => {
                  console.log(response);
                },
                error => {
                  console.log(error);
                });
          });
        }, 1000);
      }else{
        this.error=true;
      }
    }, 500);

  }

  comprovarForm(data:Game){

    let exp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    let regex = new RegExp(exp);

    if (data.title=='' || data.image=='' || data.duration=='' || data.yearReleased=='' || data.ageCalification=='' || data.description=='' ||
    data.developer=='' || data.platform=='' || this.generosString=='') {
      this.errortxt='Hay algún campo vacío';
      return false;
    } else if(!data.image.match(regex)){
      this.errortxt='En el apartado imagen no ha insertado una URL correcta';
      return false;
    }
      return true;
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

  getPlataforma(id:any){
    this.platformService.get(id)
      .subscribe(
        data => {
          this.platformModel = data;
          console.log(this.platformModel);
        },
        error => {
          console.log(error);
      });
  }

  OnChangePlatform (event: any) {
    this.developerService.get(event.target.value)
      .subscribe(
        data => {
          this.developerModel = data;
          console.log(this.developerModel);
        },
        error => {
          console.log(error);
      });
  }

  OnChangeGenre (genre:any, event :any) {
    if (event.checked) {
      this.selectedGenres.push(genre);
      console.log(this.selectedGenres)
    }else{
      for (let i = 0; i < this.selectedGenres.length; i++) {
        if (this.selectedGenres[i].id === genre.id) {
          console.log(this.selectedGenres)
          this.selectedGenres.splice(i,1);
        }
      }
    }
  }

  onSubmit(){
    console.log(this.selectedGenres);
    this.generosString='';
    this.selectedGenres.forEach((genero: any) => {
      this.generosString+=genero.name+';';
    });
  }

}
