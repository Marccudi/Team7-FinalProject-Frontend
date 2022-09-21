import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-borrows-list',
  templateUrl: './borrows-list.component.html',
  styleUrls: ['./borrows-list.component.css']
})
export class BorrowsListComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private router:Router) { }

  ngOnInit(): void {
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['login']);
    }
  }

}
