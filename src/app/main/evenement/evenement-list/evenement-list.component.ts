import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EvenementService } from '../../../../services/evenement.service';
import { Evenement } from '../../../../models/evenement.model';

import { Subject } from 'rxjs';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-evenement-list',
  templateUrl: './evenement-list.component.html',
  styleUrls: ['./evenement-list.component.scss'],
})
export class EvenementListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  @Input() dataSource: Evenement[] = [];

  constructor(
    private evenementService: EvenementService,
  ) {}

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    //this.fetchDataSource();
  }

  private fetchDataSource(): void {
    this.evenementService.getAllEvenements().then((data) => {
      this.dataSource = data;
      console.log(this.dataSource);
    });
  }
}
