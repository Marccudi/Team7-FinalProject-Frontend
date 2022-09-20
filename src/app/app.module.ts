import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyGamesComponent } from './components/my-games/my-games.component';
import { AddGameComponent } from './components/add-game/add-game.component';
import { BorrowsListComponent } from './components/borrows-list/borrows-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GameListComponent,
    GameDetailComponent,
    ProfileComponent,
    MyGamesComponent,
    AddGameComponent,
    BorrowsListComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    SideNavComponent,
    SideNavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
