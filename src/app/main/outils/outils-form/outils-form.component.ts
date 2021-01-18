import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OutilsService} from "../../../../services/outils.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Outil} from "../../../../models/outil.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-outils-form',
  templateUrl: './outils-form.component.html',
  styleUrls: ['./outils-form.component.scss']
})
export class OutilsFormComponent implements OnInit {
  currentItemId: string;
  item: Outil;
  form: FormGroup;
  state$;
  lastRoute: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private outilsService: OutilsService,
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
      this.outilsService.getOutilById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item)
      });
    } else {
      this.initForm(null);
    }
  }

  initForm(item: Outil) {
    this.form = new FormGroup({

      date: new FormControl(item?.date, [Validators.required]),
      source: new FormControl(item?.source, [Validators.required]),

    });
  }


  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  onSubmit(): void {
    const objectToSubmit: Outil = {...this.item, ...this.form.value};
    console.log(objectToSubmit);
    this.outilsService.saveOutil(objectToSubmit).then(() => {
      if (this.lastRoute=="profile") {
        this.router.navigate(['./profile'])
      }
      else {
        this.router.navigate(['./outils'])
      }
    });

  }
}
