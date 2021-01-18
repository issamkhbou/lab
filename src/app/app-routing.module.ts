import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "../../../enis21-lab/src/app/home/home.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";

import {PublicationListComponent} from "./main/publication/publication-list/publication-list.component";
import {PublicationFormComponent} from "./main/publication/publication-form/publication-form.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuard} from "../../../enis21-lab/src/services/auth.guard";
import {OutilsListComponent} from "../../../enis21-lab/src/app/main/outils/outils-list/outils-list.component";
import {OutilsFormComponent} from "../../../enis21-lab/src/app/main/outils/outils-form/outils-form.component";
// import {OutilsListComponent} from "./main/outils/outils-list/outils-list.component";
// import {OutilsFormComponent} from "./main/outils/outils-form/outils-form.component";
// import {EvenementListComponent} from "./main/evenement/evenement-list/evenement-list.component";
// import {EvenementFormComponent} from "./main/evenement/evenement-form/evenement-form.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'admin-dashboard',
    pathMatch: 'full',
    component: AdminDashboardComponent,
  } ,
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfileComponent,
  } ,

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
      }
    ]
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
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
