import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FirebaseModule } from '../@root/firebase/firebase.module';
import { PublicationService } from '../services/publication.service';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../@root/shared.module';

import { CrudLabModule } from './main/crud-lab/crud-lab.module';
import { CrudRoutingModule } from './main/crud-lab/crud-routing.module';
import { GoogleSigninDirective } from './google-signin.directive';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    HomeComponent,
    NavbarComponent,
    GoogleSigninDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FirebaseModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
    CrudLabModule,
    CrudRoutingModule,
  ],
  providers: [
    PublicationService, //, AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
