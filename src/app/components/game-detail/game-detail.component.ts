import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameHaveGenreService } from '../../service/game-have-genre.service';
import { Game } from '../../models/game';
import { GameService } from '../../service/game.service';
import { GameHaveGenre } from '../../models/game-have-genre';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Borrow } from "../../models/borrow";
import { BorrowsService } from 'src/app/service/borrows.service';

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
    platform: '',
    owner:''
  };

  genres: any;
  message = '';
  id = '';
  imagePegi= '';
  owns:any;
  activeGame:any;
  submitted:any;

  botonConfirmar=false;

  prestamoModalTxt= '¿Estás seguro de pedir este juego en préstamo?';

  constructor(private route :ActivatedRoute,
              private tokenStorage: TokenStorageService,
              private gameService: GameService,
              private router: Router,
              private gameHaveGenreService: GameHaveGenreService,
              private borrowService: BorrowsService) { }

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
        this.owns=this.owning();
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

  pegiImage(pegiTxt: string){
    if (pegiTxt=='PEGI 3') {
      return '../../../assets/pegi/PEGI_3.png';
    } else if(pegiTxt=='PEGI 7'){
      return '../../../assets/pegi/PEGI_7.png';
    } else if(pegiTxt=='PEGI 12'){
      return '../../../assets/pegi/PEGI_12.png';
    } else if(pegiTxt=='PEGI 16'){
      return '../../../assets/pegi/PEGI_16.png';
    }else{
      return '../../../assets/pegi/PEGI_18.png';
    }
  }

  owning(){
    if (this.tokenStorage.getUser().id==this.currentGame.owner.id) {
      console.log(true)
      return true;
    }else{
      console.log(false)
      return false;
    }
  }

  setActiveGame(game: any) {
    this.activeGame = game;
  }

  crearPeticionPrestamo(){

    const borrow: Borrow = {
      game: this.activeGame,
      userOwner: this.activeGame.owner,
      userBorrower: this.tokenStorage.getUser(),
      lend_date: new Date().toISOString().slice(0, 10),
      return_date: new Date().toISOString().slice(0, 10),
      pending: true
    }

    console.log(JSON.stringify(borrow));
    this.borrowService.create(borrow)
    .subscribe(
      response => {
        console.log(response);
        this.submitted= true;
      },
      error => {
        console.log(error);
    });

    this.botonConfirmar=true;
    this.prestamoModalTxt='Has realizado la petición de prestamo correctamente';

    window.open('replayteam7@gmail.com?subject=subject&body=body');

  }

}
