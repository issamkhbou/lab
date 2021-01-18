import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GLOBAL} from "../app/app-config";
import {Utils} from "../utils/utils";
import {Member} from "../models/member.model";
import {Publication} from "../models/publication.model";
import {Evenement} from "../models/evenement.model";
import {Outil} from "../models/outil.model";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  public placeholderMembers: any[] = GLOBAL._DB.members;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllMembers(): Promise<Member[]> {
    // return this.httpClient.get<Member[]>('linkToRestApi').toPromise();
    return new Promise(resolve => resolve(this.placeholderMembers));
  }

  getMemberById(id: string): Promise<Member> {
    // return this.httpClient.get<Member>('linkToRestApi').toPromise();
    return new Promise(resolve => resolve(
      this.placeholderMembers.filter(item => item.id === id)[0] ?? null
    ));
  }

  getMemberByEmail(email: string): Promise<Member> {
    // return this.httpClient.get<Member>('linkToRestApi').toPromise();
    return new Promise(resolve => resolve(
      this.placeholderMembers.filter(item => item.email === email)[0] ?? null
    ));
  }

  getPostsByAuthorId(id): Promise<Publication[]> {
    //console.log(id)
    // @ts-ignore
    return new Promise(resolve => resolve(GLOBAL._DB.publications));
  }

  geteventByAuthorId(id: string): Promise<Evenement[]> {
    // @ts-ignore
    return new Promise(resolve => resolve(GLOBAL._DB.evenements));
  }

  getToolsByAuthorId(id: string): Promise<Outil[]> {
    // @ts-ignore
    return new Promise(resolve => resolve(GLOBAL._DB.outils));
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  saveMember(member: any): Promise<Member> {
    //console.log(member)
    // return this.httpClient.post<Member>('linkToRestApi', member).toPromise();
    const memberToSave = {
      id: member.id ?? Utils.fakeNumber().toString(),
      dateNaissance: member.dateNaissance ?? new Date().toISOString(), ...member
    };
    this.placeholderMembers = [memberToSave, ...this.placeholderMembers.filter(item => item.id !== member.id)];
    //console.log(this.placeholderMembers)
    GLOBAL._DB.members = this.placeholderMembers
    return new Promise(resolve => resolve(memberToSave));
  }

  removeMemberById(id: string): Promise<void> {
    // return this.httpClient.delete<void>('linkToRestApi').toPromise();
    this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id); // all but the to be deleted id
    return new Promise(resolve => resolve());
  }

}
