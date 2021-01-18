
import {Component, OnDestroy, OnInit} from '@angular/core';
import {OutilsService} from "../../../../services/outils.service";
import {Outil} from "../../../../models/outil.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../../@root/components/confirm-dialog/confirm-dialog.component";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-outils-list',
  templateUrl: './outils-list.component.html',
  styleUrls: ['./outils-list.component.scss']
})
export class OutilsListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'date', 'source', 'actions'];
  dataSource: Outil[] = [];

  constructor(
    private outilsService :OutilsService,
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
    this.outilsService.getAllOutils().then(data => this.dataSource = data);
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
        this.outilsService.removeOutilById(id).then(() => this.fetchDataSource());
      }
    });
  }
}

