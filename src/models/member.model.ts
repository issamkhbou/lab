import {Outil} from "./outil.model";
import {Evenement} from "./evenement.model";
import {Publication} from "./publication.model";

export interface Member {
  id: string;
  cin: string;
  nom: string;
  prenom: string;
  dateNaissance : Date;
  photo: string;
  cv: string;
  email: string;
  phone:string;
  password : string ;
  pubs : Publication[] ;
  outils : Outil[] ;
  evenements : Evenement[]
}

