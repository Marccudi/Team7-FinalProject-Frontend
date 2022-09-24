import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BorrowsService } from 'src/app/service/borrows.service';
import { GameService } from 'src/app/service/game.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-borrows-list',
  templateUrl: './borrows-list.component.html',
  styleUrls: ['./borrows-list.component.css']
})
export class BorrowsListComponent implements OnInit {
  date: any;
  borrowedGames:any;
  error:string='';
  game:any;

  newBorrowgame: any

  constructor(private tokenStorage: TokenStorageService, private borrowServ:BorrowsService, private gameServ:GameService) { }

  ngOnInit(): void {
    this.date = new Date().toISOString().slice(0, 10)
    this.getBorrowsFromUser();
  }

  getBorrowById(id: number){
    this.borrowServ.get(id)
    .subscribe(
      result => {
        this.newBorrowgame = result;
         //console.log('newBorrowGame in getbyID     '+ JSON.stringify(this.newBorrowgame));
      },
      error => {
        this.error = error;
        console.log('error'+error);
      }
    )
  }

  getBorrowsFromUser() {
    this.borrowServ.getBorrowedGamesByOwner(this.tokenStorage.getUser().id+'')
    .subscribe(
      result => {
        this.borrowedGames = result;
        //console.log('games:'+JSON.stringify(result));

      },
      error => {
        this.error = error;
        console.log('error'+error);
      }
    )
  }

  saveBorrow(id:number, date:any){

    this.getBorrowById(id);
//tabla borrowed
    setTimeout(() => {
      // console.log('antesIf   '+JSON.stringify(this.newBorrowgame))
      if (this.newBorrowgame.pending) {
        this.newBorrowgame.pending=false
      } else {
        this.newBorrowgame.pending=true
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
     console.log('game:        '+ JSON.stringify(this.game));
  },
  error => {
    this.error = error;
    console.log('error: '+JSON.stringify(error));
    console.log('game error:        '+ JSON.stringify(this.game));
  }
)

  }

  delBorrow(id:number){
    this.borrowServ.delBorrow(id)
    .subscribe(
      result => {
        this.borrowedGames = result;
        console.log('games:'+JSON.stringify(result));

      },
      error => {
        this.error = error;
        console.log('error'+error);
      }
    )

  }

}
