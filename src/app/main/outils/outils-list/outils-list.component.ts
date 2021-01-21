import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { OutilsService } from '../../../../services/outils.service';
import { Outil } from '../../../../models/outil.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-outils-list',
  templateUrl: './outils-list.component.html',
  styleUrls: ['./outils-list.component.scss'],
})
export class OutilsListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  @Input() dataSource: Outil[] = [];

  constructor(private outilsService: OutilsService) {}

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    //this.fetchDataSource();
  }

  private fetchDataSource(): void {
    this.outilsService.getAllOutils().then((data) => (this.dataSource = data));
  }
}
