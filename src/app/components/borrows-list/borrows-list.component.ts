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

  games:any;
  error:string='';
  constructor(private router: Router, private gameService: GameService, private route :ActivatedRoute, private tokenStorage: TokenStorageService, private borrowServ:BorrowsService) { }

  ngOnInit(): void {
    this.getBorrowsFromUser();
  }

  getBorrowsFromUser() {
    this.borrowServ.getBorrowedGamesByOwner(this.tokenStorage.getUser().id+'')
    .subscribe(
      result => {
        this.games = result;
        console.log('games:'+JSON.stringify(result));
      },
      error => {
        this.error = error;
        console.log('error'+error);
      }
    )
  }

}
