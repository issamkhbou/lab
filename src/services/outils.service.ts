import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GLOBAL} from "../app/app-config";
import {Utils} from "../utils/utils";
import {Outil} from "../models/outil.model";

@Injectable({
  providedIn: 'root'
})
export class OutilsService {
  public placeholderOutils: any[] = GLOBAL._DB.outils;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllOutils(): Promise<Outil[]> {
    // return this.httpClient.get<Member[]>('linkToRestApi').toPromise();
    return new Promise(resolve => resolve(this.placeholderOutils));
  }

  getOutilById(id: string): Promise<Outil> {
    // return this.httpClient.get<Member>('linkToRestApi').toPromise();
    return new Promise(resolve => resolve(
      this.placeholderOutils.filter(item => item.id == id)[0] ?? null
    ));
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  saveOutil(outil: any): Promise<Outil> {
    // return this.httpClient.post<Member>('linkToRestApi', member).toPromise();
    const outilToSave = {
      id: outil.id ?? Utils.fakeNumber().toString(),
      date: outil.date ?? new Date().toISOString(), ...outil
    };
    this.placeholderOutils = [outilToSave, ...this.placeholderOutils.filter(item => item.id !== outil.id)];

    return new Promise(resolve => resolve(outilToSave));
  }

  removeOutilById(id: string): Promise<void> {
    // return this.httpClient.delete<void>('linkToRestApi').toPromise();
    this.placeholderOutils = this.placeholderOutils.filter(item => item.id !== id);
    return new Promise(resolve => resolve());
  }

}
