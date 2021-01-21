import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EvenementService } from '../../../../services/evenement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from '../../../../models/evenement.model';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/@root/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-evenement-form',
  templateUrl: './evenement-form.component.html',
  styleUrls: ['./evenement-form.component.scss'],
})
export class EvenementFormComponent implements OnInit {
  protected _onDestroy = new Subject<void>();

  currentItemId: string;
  item: Evenement;
  form: FormGroup;
  state$;
  lastRoute = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private evenementService: EvenementService,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
    this.state$.subscribe((data) => {
      this.lastRoute = data['lastRoute'];
      console.log(this.lastRoute);
    });

    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.evenementService
        .getEvenementById(this.currentItemId)
        .then((item) => {
          this.item = item;
          this.initForm(item);
        });
    } else {
      this.initForm(null);
    }
  }

  initForm(item: Evenement) {
    this.form = new FormGroup({
      titre: new FormControl(item?.titre, [Validators.required]),
      lieu: new FormControl(item?.lieu, [Validators.required]),
      date: new FormControl(item?.date),
    });
  }

  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  onSubmit(): void {
    const objectToSubmit: Evenement = { ...this.item, ...this.form.value };
    console.log(this.form.value);
    this.evenementService.saveEvenement(objectToSubmit).then(() => {
      if (this.lastRoute == 'profile') {
        this.router.navigate(['/profile']);
      } else {
        this.router.navigate(['/evenements']);
      }
    });
  }

  onRemovePub(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this._onDestroy))
      .subscribe((isDeleteConfirmed) => {
        console.log('removing: ', isDeleteConfirmed);
        if (isDeleteConfirmed) {
          this.evenementService
            .removeEvenementById(id)
            .then(() => this.router.navigateByUrl('/profile'));
        }
      });
  }
}
