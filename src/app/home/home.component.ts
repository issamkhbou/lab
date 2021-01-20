import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Evenement } from 'src/models/evenement.model';
import { Member } from 'src/models/member.model';
import { Outil } from 'src/models/outil.model';
import { Publication } from 'src/models/publication.model';
import { AuthService } from 'src/services/auth.service';
import { EvenementService } from 'src/services/evenement.service';
import { MemberService } from 'src/services/member.service';
import { OutilsService } from 'src/services/outils.service';
import { PublicationService } from 'src/services/publication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean;
  user: any;
  allmembers: Member[];
  allPubs: Publication[];
  allEvents: Evenement[];
  allTools: Outil[];

  constructor(
    private memberService: MemberService,
    private publicationService: PublicationService,
    private outilsService: OutilsService,
    private evenementService: EvenementService,
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.userClaims$.subscribe((user) => {
      this.user = !!user ? user : null;
      this.isLoggedIn = !!user;
    });
    this.memberService
      .getAllMembers()
      .then((members) => (this.allmembers = members));
    this.publicationService
      .getAllPublications()
      .then((pubs) => (this.allPubs = pubs));
    this.outilsService.getAllOutils().then((tools) => (this.allTools = tools));
    this.evenementService
      .getAllEvenements()
      .then((events) => (this.allEvents = events));
  }

  /*   logout(): void {
    this.authService.doLogout().finally(() => {
      this.router.navigate(['/login']);
    });
  } */

  goToProfile(){
    this.router.navigateByUrl('profile');
  }
}
