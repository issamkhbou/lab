import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../../../../../services/member.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Member } from 'src/models/member.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  currentItemId: string;
  user: any;
  form: FormGroup;
  state$: Observable<object>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
    this.state$.subscribe((data) => {
      this.user = data['currentUser'];
      console.log(this.user);
    });

    this.initForm(this.user);
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
    const objectToSubmit: Member = { ...this.user, ...this.form.value };
    console.log(objectToSubmit);
    this.memberService
      .saveMember(objectToSubmit)
      .then(() => this.router.navigate(['./profile']));
  }
}
