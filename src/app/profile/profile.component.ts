import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Member } from 'src/models/member.model';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  nombrePublications: number;
  nombreEvenements: number;
  nombreOutils: number;
  currentList = 'publications';

  id: number;
  memberEmail: string;
  member: any;
  dataBaseMember: Member;
  memberRole: string;
  isStudent = true;

  constructor(
    private memberService: MemberService,
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      this.member = user;
      this.memberEmail = this.member.email;

      if (!!this.member) {
        if (this.memberEmail.includes('stud')) {
          this.memberRole = 'STUDENT_ROLE';
        } else {
          this.memberRole = 'TEACHER_ROLE';
          this.isStudent = false;
        }
        console.log(this.memberRole);
      }

      this.memberService.getMemberByEmail(this.memberEmail).then((member) => {
        this.dataBaseMember = member;
        this.id = Number(this.dataBaseMember.id);

        // TODO : change 1 to id when there is backend calls
        this.memberService
          .getToolsByAuthorId('1')
          .then((data) => (this.nombreOutils = data.length));
        this.memberService
          .geteventByAuthorId('1')
          .then((data) => (this.nombreEvenements = data.length));
        this.memberService
          .getPostsByAuthorId('1')
          .then((data) => (this.nombrePublications = data.length));

        /* console.log(
          this.id +
            ' ' +
            this.dataBaseMember.email +
            ' ' +
            this.dataBaseMember.dateNaissance
        ); */
      });
    });
  }

  changeCurrentListToTools() {
    this.currentList = 'outils';
  }

  changeCurrentListToPub() {
    this.currentList = 'publications';
  }

  changeCurrentListToEvents() {
    this.currentList = 'evenements';
    console.log(this.currentList);
  }
}
