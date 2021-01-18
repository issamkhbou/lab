import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GLOBAL} from "../app/app-config";
import {Utils} from "../utils/utils";
import {Publication} from "../models/publication.model";
import {Member} from "../models/member.model";

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  public placeholderPublications: any[] = GLOBAL._DB.publications;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllPublications(): Promise<Publication[]> {
    // return this.httpClient.get<Member[]>('linkToRestApi').toPromise();
    return new Promise(resolve => resolve(this.placeholderPublications));
  }

  getPublicationById(id: string): Promise<Publication> {
    // return this.httpClient.get<Member>('linkToRestApi').toPromise();
    console.log(this.placeholderPublications)
    return new Promise(resolve => resolve(
      this.placeholderPublications.filter(item => item.id == id)[0] ?? null
    ));
  }


  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  savePublication(publication: any): Promise<Publication> {
    // return this.httpClient.post<Member>('linkToRestApi', member).toPromise();
    const memberToSave = {
      id: publication.id ?? Utils.fakeNumber().toString(),
      dateApparition: publication.dateApparition ?? new Date().toISOString(), ...publication
    };
    this.placeholderPublications = [memberToSave, ...this.placeholderPublications.filter(item => item.id !== publication.id)];

    return new Promise(resolve => resolve(memberToSave));
  }

  removePublicationById(id: string): Promise<void> {
    // return this.httpClient.delete<void>('linkToRestApi').toPromise();
    this.placeholderPublications = this.placeholderPublications.filter(item => item.id !== id);
    return new Promise(resolve => resolve());
  }

}
