import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameListComponent } from "./components/game-list/game-list.component";
import { MyGamesComponent } from "./components/my-games/my-games.component";
import { BorrowsListComponent } from "./components/borrows-list/borrows-list.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { GameDetailComponent } from "./components/game-detail/game-detail.component";
import { AddGameComponent } from "./components/add-game/add-game.component";
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginActivateGuard } from './security/login-activate.guard';

const routes: Routes = [
  { path: 'inicio', component: GameListComponent },
  { path: 'mis-juegos', component: MyGamesComponent},
  //, canActivate:[LoginActivateGuard]
  { path: 'mis-prestamos', component: BorrowsListComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'juego/:id', component: GameDetailComponent },
  { path: 'juego-nuevo', component: AddGameComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

