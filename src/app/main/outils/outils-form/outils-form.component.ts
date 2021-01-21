import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OutilsService } from '../../../../services/outils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Outil } from '../../../../models/outil.model';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Publication } from '../../../../models/publication.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../@root/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-outils-form',
  templateUrl: './outils-form.component.html',
  styleUrls: ['./outils-form.component.scss'],
})
export class OutilsFormComponent implements OnInit {
  protected _onDestroy = new Subject<void>();

  currentItemId: string;
  item: Outil;
  form: FormGroup;
  state$;
  lastRoute = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private outilsService: OutilsService,
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
      this.outilsService.getOutilById(this.currentItemId).then((item) => {
        this.item = item;
        this.initForm(item);
      });
    } else {
      this.initForm(null);
    }
  }

  initForm(item: Outil) {
    this.form = new FormGroup({
      source: new FormControl(item?.source, [Validators.required]),
      date: new FormControl(item?.date),
    });
  }

  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  onSubmit(): void {
    const objectToSubmit: Publication = { ...this.item, ...this.form.value };
    console.log(this.form.value);
    this.outilsService.saveOutil(objectToSubmit).then(() => {
      if (this.lastRoute == 'profile') {
        this.router.navigate(['/profile']);
      } else {
        this.router.navigate(['/outils']);
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
          this.outilsService
            .removeOutilById(id)
            .then(() => this.router.navigateByUrl('/profile'));
        }
      });
  }
}
