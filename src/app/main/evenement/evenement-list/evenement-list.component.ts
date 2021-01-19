import {Component, OnDestroy, OnInit} from '@angular/core';
import {EvenementService} from "../../../../services/evenement.service";
import {Evenement} from "../../../../models/evenement.model";
//import {MatDialog} from "@angular/material/dialog";
//import {ConfirmDialogComponent} from "../../../../@root/components/confirm-dialog/confirm-dialog.component";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-evenement-list',
  templateUrl: './evenement-list.component.html',
  styleUrls: ['./evenement-list.component.scss']
})
export class EvenementListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  //displayedColumns: string[] = ['id', 'titre', 'type', 'dateApparition', 'lien', 'sourcePdf', 'actions'];
  dataSource: Evenement[] = [];

  nombrePublications : Number ;
  nombreEvenements : Number ;
  nombreOutils : Number ;
  constructor(
    private evenementService :EvenementService,
    private memberService: MemberService
  ) { }


  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.fetchDataSource();
    this.memberService.getToolsByAuthorId("1").then(data=>this.nombreOutils=data.length)
    this.memberService.geteventByAuthorId("1").then(data=>this.nombreEvenements=data.length)
    this.memberService.getPostsByAuthorId("1").then(data=>this.nombrePublications=data.length)

  }

  private fetchDataSource(): void {
    this.evenementService.getAllEvenements().then(data => {
      this.dataSource = data
      console.log(this.dataSource);

    });
  }
}

