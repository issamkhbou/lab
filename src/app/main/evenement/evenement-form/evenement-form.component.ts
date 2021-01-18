import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EvenementService} from "../../../../services/evenement.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Evenement} from "../../../../models/evenement.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-evenement-form',
  templateUrl: './evenement-form.component.html',
  styleUrls: ['./evenement-form.component.scss']
})
export class EvenementFormComponent implements OnInit {
  currentItemId: string;
  item: Evenement;
  form: FormGroup;
  state$;
  lastRoute: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private evenementService: EvenementService,
  ) {
  }

  ngOnInit(): void {

    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
    this.state$.subscribe(data => {
      this.lastRoute = data["lastRoute"];
      console.log(this.lastRoute)
    })


    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.evenementService.getEvenementById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item)
      });
    } else {
      this.initForm(null);
    }
  }

  initForm(item: Evenement) {
    this.form = new FormGroup({

      titre: new FormControl(item?.titre, [Validators.required]),
      lieu: new FormControl(item?.lieu, [Validators.required]),
      date: new FormControl(item?.date)
    });
  }


  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  onSubmit(): void {
    const objectToSubmit: Evenement = {...this.item, ...this.form.value};
    console.log(objectToSubmit);
    this.evenementService.saveEvenement(objectToSubmit).then(() => {
      if (this.lastRoute=="profile") {
        this.router.navigate(['./profile'])
      }
      else {
        this.router.navigate(['./evenement'])
      }
    });

  }
}
