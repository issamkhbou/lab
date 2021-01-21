import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Member } from 'src/models/member.model';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  form: FormGroup;

  id: number;
  memberEmail: string;
  member: any;
  dataBaseMember: Member;
  memberRole: string;
  isStudent = true;

  constructor(
    private router: Router,
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
        this.initForm(this.dataBaseMember);
        this.id = Number(this.dataBaseMember.id);
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

  initForm(item: Member) {
    this.form = new FormGroup({
      cin: new FormControl(item?.cin, [Validators.required]),
      nom: new FormControl(item?.nom, [Validators.required]),
      cv: new FormControl(item?.cv, [Validators.required]),
      prenom: new FormControl(item?.prenom, [Validators.required]),
      phone: new FormControl(item?.phone, [Validators.required]),
      dateNaissance: new FormControl(item?.dateNaissance),
    });
  }

  onSubmit(): void {
    const objectToSubmit: Member = {
      ...this.dataBaseMember,
      ...this.form.value,
    };
    console.log(objectToSubmit);
    this.memberService
      .saveMember(objectToSubmit)
      .then(() => this.router.navigate(['./home']));
  }
}
