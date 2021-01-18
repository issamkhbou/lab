import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import {PublicationListComponent} from "./main/publication/publication-list/publication-list.component";
import {FirebaseModule} from '../@root/firebase/firebase.module';
import {PublicationService} from "../services/publication.service";
import {HttpClientModule} from "@angular/common/http";
import {PublicationFormComponent} from "./main/publication/publication-form/publication-form.component";
import { ProfileComponent } from './profile/profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import {SharedModule} from "../@root/shared.module";
import {OutilsListComponent} from './main/outils/outils-list/outils-list.component';
import {OutilsFormComponent} from './main/outils/outils-form/outils-form.component';
//import {EvenementListComponent} from './main/evenement/evenement-list/evenement-list.component';
//import {EvenementFormComponent} from './main/evenement/evenement-form/evenement-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    HomeComponent,
    NavbarComponent,
    PublicationListComponent ,
    PublicationFormComponent,
    OutilsListComponent,
    OutilsFormComponent,
    //EvenementListComponent,
   // EvenementFormComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FirebaseModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    PublicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
