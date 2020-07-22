import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CinemaComponent } from './cinema/cinema.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';


const appRoutes:Routes= [
  {path:'',component: CinemaComponent},
  {path:'admin',component: AdminPageComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    CinemaComponent,
    AdminPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
