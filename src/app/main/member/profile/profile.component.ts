import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../../services/member.service';
import { PublicationService } from '../../../../services/publication.service';
import { AuthService } from '../../../../services/auth.service';
import { Member } from '../../../../models/member.model';
import { Publication } from '../../../../models/publication.model';
import firebase from 'firebase';
import { EvenementService } from '../../../../services/evenement.service';
import { Evenement } from '../../../../models/evenement.model';
import { Outil } from '../../../../models/outil.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  id: Number;
  memberEmail: string;
  member: any;
  dataBaseMember: Member;
  publications: Publication[]; //related to the memeber
  evenements: Evenement[];
  outils: Outil[];
  SupervisedStudents: Promise<any>; //related to the memeber

  idCurrentLoggedUser: Number;
  memberRole: string;
  isStudent = true;

  constructor(
    private memberService: MemberService,
    private publicationService: PublicationService,
    private evenementService: EvenementService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    //associate user with member
    this.authService.userClaims$.subscribe((user) => {
      this.member = !!user ? user : null;
      this.memberEmail = user.email;
    });
    this.member = firebase.auth().currentUser;
    this.memberEmail = this.member.email;
    if (!!this.member) {
      if (this.memberEmail.includes('stud')) {
        this.memberRole = 'STUDENT_ROLE';
      } else {
        this.memberRole = 'TEACHER_ROLE';
        this.isStudent = false;
      }
    }

    this.memberService.getMemberByEmail(this.memberEmail).then((member) => {
      this.dataBaseMember = member;
      this.id = Number(this.dataBaseMember.id);
      //console.log(this.id + " " +this.dataBaseMember.email + ' ' +this.dataBaseMember.dateNaissance )

      this.memberService.getPostsByAuthorId(this.id.toString()).then((pubs) => {
        this.publications = pubs;
      });

      this.memberService
        .geteventByAuthorId(this.id.toString())
        .then((events) => {
          this.evenements = events;
        });

      this.memberService
        .getToolsByAuthorId(this.id.toString())
        .then((tools) => {
          this.outils = tools;
        });
    });

    //this.SupervisedStudents=this.professorService.getSupervisedStudents(this.id);
  }

  loguser() {
    console.log(this.memberEmail);
  }

  logpubs() {
    console.log(this.publications);
  }

  goToPublicationDetail() {}
}
