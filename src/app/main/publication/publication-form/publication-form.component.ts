import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PublicationService} from "../../../../services/publication.service";
import {ActivatedRoute, Router, RoutesRecognized} from "@angular/router";
import {Publication} from "../../../../models/publication.model";
import {filter, map, pairwise} from "rxjs/operators";

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss']
})
export class PublicationFormComponent implements OnInit {
  currentItemId: string;
  item: Publication;
  form: FormGroup;
  state$  ;
  lastRoute="" ;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private publicationService: PublicationService,
  ) {
  }

  ngOnInit(): void {

    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
    this.state$.subscribe(data =>{
      this.lastRoute=data["lastRoute"] ;
      console.log(this.lastRoute)
    })



    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.publicationService.getPublicationById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item)
      });
    } else {
      this.initForm(null);
    }
  }

  initForm(item: Publication) {
    this.form = new FormGroup({

      titre: new FormControl(item?.titre, [Validators.required]),
      type: new FormControl(item?.type, [Validators.required]),
      lien: new FormControl(item?.lien, [Validators.required]),
      sourcePdf: new FormControl(item?.sourcePdf, [Validators.required]),
      dateApparition: new FormControl(item?.dateApparition)
    });
  }


  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  onSubmit(): void {
    const objectToSubmit: Publication = {...this.item, ...this.form.value};
    console.log(objectToSubmit);
    this.publicationService.savePublication(objectToSubmit).then(() => {
      if (this.lastRoute=="profile") {
        this.router.navigate(['./profile'])
      }
      else {
        this.router.navigate(['./publications'])
      }
    });

  }

}

