import {NgModule} from '@angular/core';
import {MaterialModule} from "./material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogModule} from "./components/confirm-dialog/confirm-dialog.module";
import { LoadingComponent } from './components/loading/loading.component';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {FooterComponent} from "./components/footer/footer.component";
import {MastheadComponent} from "./components/masthead/masthead.component";


@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    ConfirmDialogModule,
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent ,
    ConfirmDialogModule,
    NavbarComponent ,
    FooterComponent ,
    MastheadComponent
  ],
  declarations: [LoadingComponent , NavbarComponent , FooterComponent ,MastheadComponent],
})
export class SharedModule {
}