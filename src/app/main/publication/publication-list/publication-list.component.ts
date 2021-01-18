import {Component, OnDestroy, OnInit} from '@angular/core';
import {PublicationService} from "../../../../services/publication.service";
import {Publication} from "../../../../models/publication.model";
//import {MatDialog} from "@angular/material/dialog";
//import {ConfirmDialogComponent} from "../../../../@root/components/confirm-dialog/confirm-dialog.component";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {MemberService} from "../../../../services/member.service";

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  //displayedColumns: string[] = ['id', 'titre', 'type', 'dateApparition', 'lien', 'sourcePdf', 'actions'];
  dataSource: Publication[] = [];

  nombrePublications : Number ;
  nombreEvenements : Number ;
  nombreOutils : Number ;
  constructor(
    private publicationService :PublicationService,
    private memberService: MemberService


    //private dialog: MatDialog,
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
    this.publicationService.getAllPublications().then(data => this.dataSource = data);
  }


}

