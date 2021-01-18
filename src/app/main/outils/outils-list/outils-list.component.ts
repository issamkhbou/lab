
import {Component, OnDestroy, OnInit} from '@angular/core';
import {OutilsService} from "../../../../services/outils.service";
import {Outil} from "../../../../models/outil.model";
import {Subject} from "rxjs";
import {MemberService} from "../../../../services/member.service";

@Component({
  selector: 'app-outils-list',
  templateUrl: './outils-list.component.html',
  styleUrls: ['./outils-list.component.scss']
})
export class OutilsListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  //displayedColumns: string[] = ['id', 'titre', 'type', 'dateApparition', 'lien', 'sourcePdf', 'actions'];
  dataSource: Outil[] = [];

  nombrePublications : Number ;
  nombreEvenements : Number ;
  nombreOutils : Number ;
  constructor(
    private outilsService :OutilsService,
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
    this.outilsService.getAllOutils().then(data => this.dataSource = data);
  }

}

