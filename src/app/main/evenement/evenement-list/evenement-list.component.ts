import {Component, OnDestroy, OnInit} from '@angular/core';
import {EvenementService} from "../../../../services/evenement.service";
import {Evenement} from "../../../../models/evenement.model";
//import {MatDialog} from "@angular/material/dialog";
//import {ConfirmDialogComponent} from "../../../../@root/components/confirm-dialog/confirm-dialog.component";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-evenement-list',
  templateUrl: './evenement-list.component.html',
  styleUrls: ['./evenement-list.component.scss']
})
export class EvenementListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'titre', 'date', 'lieu', 'actions'];
  dataSource: Evenement[] = [];

  constructor(
    private evenementService: EvenementService,
    //private dialog: MatDialog,
  ) {
  }


  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.fetchDataSource();
  }

  private fetchDataSource(): void {
    this.evenementService.getAllEvenements().then(data => this.dataSource = data);
  }

  // onRemoveAccount(id: any): void {
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     hasBackdrop: true,
  //     disableClose: false,
  //   });
  //
  //   dialogRef.componentInstance.confirmButtonColor = 'warn';
  //
  //   dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
  //     console.log('removing: ', isDeleteConfirmed);
  //     if (isDeleteConfirmed) {
  //       this.evenementService.removeEvenementById(id).then(() => this.fetchDataSource());
  //     }
  //   });
  // }
}

