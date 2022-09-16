import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from "./components/game-list/game-list.component";
import { MyGamesComponent } from "./components/my-games/my-games.component";
import { BorrowsListComponent } from "./components/borrows-list/borrows-list.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { GameDetailComponent } from "./components/game-detail/game-detail.component";
import { AddGameComponent } from "./components/add-game/add-game.component";

const routes: Routes = [
  { path: 'inicio', component: GameListComponent },
  { path: 'mis-juegos', component: MyGamesComponent },
  { path: 'mis-prestamos', component: BorrowsListComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'juego', component: GameDetailComponent },
  { path: 'juego-nuevo', component: AddGameComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
