import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PublicationService} from "../../../../services/publication.service";
import {ActivatedRoute, Router, RoutesRecognized} from "@angular/router";
import {Publication} from "../../../../models/publication.model";
import {filter, map, pairwise, takeUntil} from "rxjs/operators";
import {ConfirmDialogComponent} from "../../../../@root/components/confirm-dialog/confirm-dialog.component";
import {Subject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss']
})
export class PublicationFormComponent implements OnInit, OnDestroy {
  protected _onDestroy = new Subject<void>();

  currentItemId: string;
  item: Publication;
  form: FormGroup;
  state$;
  lastRoute = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private publicationService: PublicationService,
    private dialog: MatDialog,
  ) {
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
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
    console.log(this.form.value);
    this.publicationService.savePublication(objectToSubmit).then(() => {

      if (this.lastRoute == "profile") {
        this.router.navigate(['/profile'])
      } else {
        this.router.navigate(['/publications'])
      }
    });

  }

  onRemovePub(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.publicationService.removePublicationById(id).then(() => this.router.navigateByUrl("/profile"));
      }
    });
  }

}

