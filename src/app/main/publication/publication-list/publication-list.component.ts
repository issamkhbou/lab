import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PublicationService } from '../../../../services/publication.service';
import { Publication } from '../../../../models/publication.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss'],
})
export class PublicationListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  @Input() dataSource: Publication[] = [];


  constructor(
    private publicationService: PublicationService //private memberService: MemberService //private dialog: MatDialog,
  ) {}

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    //this.fetchDataSource();
  }

  private fetchDataSource(): void {
    this.publicationService
      .getAllPublications()
      .then((data) => (this.dataSource = data));
  }
}
