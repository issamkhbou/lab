import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from 'src/app/profile/edit-profile/edit-profile.component';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { EvenementFormComponent } from '../evenement/evenement-form/evenement-form.component';
import { EvenementListComponent } from '../evenement/evenement-list/evenement-list.component';
import { OutilsFormComponent } from '../outils/outils-form/outils-form.component';
import { OutilsListComponent } from '../outils/outils-list/outils-list.component';
import { PublicationFormComponent } from '../publication/publication-form/publication-form.component';
import { PublicationListComponent } from '../publication/publication-list/publication-list.component';

const routes: Routes = [
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfileComponent,
  },
  {
    path: 'profile/edit',
    pathMatch: 'full',
    component: EditProfileComponent,
  },

  {
    path: 'outils',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: OutilsListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: OutilsFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: OutilsFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
  {
    path: 'publications',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PublicationListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: PublicationFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: PublicationFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
  {
    path: 'evenements',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EvenementListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: EvenementFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: EvenementFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudRoutingModule {}
