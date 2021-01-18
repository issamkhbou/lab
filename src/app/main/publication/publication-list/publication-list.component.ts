import {Component, OnDestroy, OnInit} from '@angular/core';
import {PublicationService} from "../../../../services/publication.service";
import {Publication} from "../../../../models/publication.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../../@root/components/confirm-dialog/confirm-dialog.component";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'titre', 'type', 'dateApparition', 'lien', 'sourcePdf', 'actions'];
  dataSource: Publication[] = [];

  constructor(
    private publicationService :PublicationService,
    private dialog: MatDialog,
  ) { }


  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.fetchDataSource();
  }

  private fetchDataSource(): void {
    this.publicationService.getAllPublications().then(data => this.dataSource = data);
  }

  onRemoveAccount(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.publicationService.removePublicationById(id).then(() => this.fetchDataSource());
      }
    });
  }
}

