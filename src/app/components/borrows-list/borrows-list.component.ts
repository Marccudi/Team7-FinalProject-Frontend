import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Own } from 'src/app/models/own';
import { BorrowsService } from 'src/app/service/borrows.service';
import { GameHaveGenreService } from 'src/app/service/game-have-genre.service';
import { GameService } from 'src/app/service/game.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { OwnsService } from "../../service/owns.service";

@Component({
  selector: 'app-borrows-list',
  templateUrl: './borrows-list.component.html',
  styleUrls: ['./borrows-list.component.css']
})
export class BorrowsListComponent implements OnInit {
  date: any;
  borrowedGames: any;
  orderedGames: any;
  error: string = '';
  game: any;

  newBorrowgame: any;

  gameDevelopers: string[] = [];
  gameGenres: string[] = [];
  gamePlatforms: string[] = [];

  exchangePetitions:any;
  newExchangePetition:any
  editExchangePetition:any;

  constructor(private tokenStorage: TokenStorageService, private borrowServ:BorrowsService, private gameServ:GameService, private ownsService :OwnsService, private gameHaveGenreService: GameHaveGenreService) { }

  ngOnInit(): void {
    this.date = new Date().toISOString().slice(0, 10)
    this.getBorrowsFromUser();
    this.getOrderedGames();

    setTimeout(() => {
      this.saveGameDevelopers();
      this.saveGameGenres();
      this.saveGamePlatforms();
    }, 1000);
  }

  getBorrowById(id: number) {
    this.borrowServ.get(id)
      .subscribe(
        result => {
          this.newBorrowgame = result;
          //console.log('newBorrowGame in getbyID     '+ JSON.stringify(this.newBorrowgame));
        },
        error => {
          this.error = error;
          console.log('error' + error);
        }
      )
  }

  getBorrowsFromUser() {
    this.borrowServ.getBorrowedGamesByOwner(this.tokenStorage.getUser().id + '')
      .subscribe(
        result => {
          this.borrowedGames = result;
          //console.log('games:'+JSON.stringify(result));

        },
        error => {
          this.error = error;
          console.log('error' + error);
        }
      )
  }

  getOrderedGames() {
    this.borrowServ.getBorrowedGamesByBorrower(this.tokenStorage.getUser().id + '')
      .subscribe(
        result => {
          this.orderedGames = result;
          console.log('Ordered games:' + JSON.stringify(result));
        },
        error => {
          this.error = error;
          console.log('error' + error);
        }
      )
  }

  saveBorrow(id: number, date: any) {

    this.getBorrowById(id);
    //tabla borrowed
    setTimeout(() => {
      // console.log('antesIf   '+JSON.stringify(this.newBorrowgame))
      if (this.newBorrowgame.pending) {
        this.newBorrowgame.pending = false
        //ATENCION
        //el comentario de abajo hace que cuandodes al ok dentro del modal, los prestamos con ese juego ya no vuelven a salir al modal
        //this.borrowedGames.pending=false;
      } else {
        this.newBorrowgame.pending = true
      }
      this.newBorrowgame.return_date = date;
      //console.log(this.newBorrowgame.return_date);

      // console.log('despuesIF   '+JSON.stringify(this.newBorrowgame))
    }, 500);

    setTimeout(() => {
      this.borrowServ.saveBorrow(id, this.newBorrowgame)
        .subscribe(
          result => {
            this.newBorrowgame = result;
            window.location.reload()
            // console.log('games:'+JSON.stringify(result));
          },
          error => {
            this.error = error;
            // console.log('error'+JSON.stringify(error));
          }
        )
    }, 1000);

    // tabla games
    this.gameServ.get(id)
      .subscribe(
        result => {
          this.game = result;
          console.log('game:        ' + JSON.stringify(this.game));
        },
        error => {
          this.error = error;
          console.log('error: ' + JSON.stringify(error));
          console.log('game error:        ' + JSON.stringify(this.game));
        }
      )

  }

  delBorrow(id: number) {
    this.borrowServ.delBorrow(id)
      .subscribe(
        result => {
          this.borrowedGames = result;
          console.log('games:' + JSON.stringify(result));
          window.location.reload()
        },
        error => {
          this.error = error;
          console.log('error' + error);
        }
      )

  }

  saveGamePlatforms() {
    for (let index = 0; index < this.orderedGames.length; index++) {
      const orderedGame = this.orderedGames[index];
      if (this.gamePlatforms.indexOf(orderedGame.game.platform.name) == -1) {
        this.gamePlatforms.push(orderedGame.game.platform.name);
      }
    }
    for (let index = 0; index < this.borrowedGames.length; index++) {
      const borrowedGame = this.borrowedGames[index];
      if (this.gamePlatforms.indexOf(borrowedGame.game.platform.name) == -1) {
        this.gamePlatforms.push(borrowedGame.game.platform.name);
      }
    }
  }

  saveGameDevelopers() {
    for (let index = 0; index < this.orderedGames.length; index++) {
      const orderedGame = this.orderedGames[index];
      if (this.gameDevelopers.indexOf(orderedGame.game.developer.name) == -1) {
        this.gameDevelopers.push(orderedGame.game.developer.name);
      }
    }
    for (let index = 0; index < this.borrowedGames.length; index++) {
      const borrowedGame = this.borrowedGames[index];
      if (this.gameDevelopers.indexOf(borrowedGame.game.developer.name) == -1) {
        this.gameDevelopers.push(borrowedGame.game.developer.name);
      }
    }
  }

  saveGameGenres() {
    
    for (let index = 0; index < this.orderedGames.length; index++) {
      const orderedGame = this.orderedGames[index];
      this.gameHaveGenreService.getGenresXGame(orderedGame.game.id).subscribe(data => {
        for (let index = 0; index < data.length; index++) {
          const gameHaveGenre = data[index];
          if (this.gameGenres.indexOf(gameHaveGenre.genre.name) == -1) {
            this.gameGenres.push(gameHaveGenre.genre.name);
          }
        }
      });
    }
    for (let index = 0; index < this.borrowedGames.length; index++) {
      const borrowedGame = this.borrowedGames[index];
      this.gameHaveGenreService.getGenresXGame(borrowedGame.game.id).subscribe(data => {
        for (let index = 0; index < data.length; index++) {
          const gameHaveGenre = data[index];
          if (this.gameGenres.indexOf(gameHaveGenre.genre.name) == -1) {
            this.gameGenres.push(gameHaveGenre.genre.name);
          }
        }
      });
    }
  }
  getAllExchangePetitions(){
    this.ownsService.getExchangesPetitions(this.tokenStorage.getUser().id)
    .subscribe(
      result => {
        this.exchangePetitions=result;
      },
      error => {
        console.log(error);
      }
    );

  }

saveOwn(id:any, exchangePetition:any){

  console.log('Guardamos');

  this.editExchangePetition = {
    gameOldOwner: exchangePetition.gameOldOwner,
    gameNewOwner: exchangePetition.gameNewOwner,
    userOldOwner: exchangePetition.userOldOwner,
    userNewOwner: exchangePetition.userNewOwner,
    exchange_date: exchangePetition.exchange_date,
    pending:false
  };

  console.log(JSON.stringify(this.editExchangePetition))

  this.ownsService.saveOwn(id, this.editExchangePetition)
  .subscribe (
    response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });


  setTimeout(() => {
    this.newExchangePetition = {
      gameOldOwner: exchangePetition.gameNewOwner,
      gameNewOwner: exchangePetition.gameOldOwner,
      userOldOwner: exchangePetition.userNewOwner,
      userNewOwner: exchangePetition.userOldOwner,
      exchange_date: new Date().toISOString().slice(0, 10),
      pending:false
    }
    this.ownsService.create(this.newExchangePetition)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
      });
  }),500;
}

deleteOwn(id:any){
  console.log('Borramos')
}

}
