import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationListComponent } from '../publication/publication-list/publication-list.component';
import { PublicationFormComponent } from '../publication/publication-form/publication-form.component';
import { OutilsListComponent } from '../outils/outils-list/outils-list.component';
import { OutilsFormComponent } from '../outils/outils-form/outils-form.component';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CrudRoutingModule } from './crud-routing.module';
import { EvenementListComponent } from '../evenement/evenement-list/evenement-list.component';
import { EvenementFormComponent } from '../evenement/evenement-form/evenement-form.component';
import { EditProfileComponent } from 'src/app/profile/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    PublicationListComponent,
    PublicationFormComponent,
    OutilsListComponent,
    OutilsFormComponent,
    EvenementListComponent,
    EvenementFormComponent,
    ProfileComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CrudRoutingModule,
  ],
  exports: [
    PublicationListComponent,
    PublicationFormComponent,
    OutilsListComponent,
    OutilsFormComponent,
    EvenementListComponent,
    EvenementFormComponent,
    ProfileComponent,
    EditProfileComponent
  ],
})
export class CrudLabModule {}
