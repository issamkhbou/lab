import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GLOBAL} from "../app/app-config";
import {Utils} from "../utils/utils";
import {Evenement} from "../models/evenement.model";

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  public placeholderEvenements: any[] = GLOBAL._DB.evenements;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllEvenements(): Promise<Evenement[]> {
    // return this.httpClient.get<Evenement[]>('linkToRestApi').toPromise();
    
    return new Promise(resolve => resolve(this.placeholderEvenements));
  }

  getEvenementById(id: string): Promise<Evenement> {
    // return this.httpClient.get<Evenement>('linkToRestApi').toPromise();
    return new Promise(resolve => resolve(
      this.placeholderEvenements.filter(item => item.id == id)[0] ?? null
    ));
  }



  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  saveEvenement(evenement: any): Promise<Evenement> {
    // return this.httpClient.post<Evenement>('linkToRestApi', evenement).toPromise();
    const evenementToSave = {
      id: evenement.id ?? Utils.fakeNumber().toString(),
      date: evenement.date ?? new Date().toISOString(), ...evenement
    };
    this.placeholderEvenements = [evenementToSave, ...this.placeholderEvenements.filter(item => item.id !== evenement.id)];

    return new Promise(resolve => resolve(evenementToSave));
  }

  removeEvenementById(id: string): Promise<void> {
    // return this.httpClient.delete<void>('linkToRestApi').toPromise();
    this.placeholderEvenements = this.placeholderEvenements.filter(item => item.id !== id);
    return new Promise(resolve => resolve());
  }

  geteventByAuthorId(id: string) {

  }
}
