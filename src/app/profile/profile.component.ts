import {Component, OnInit} from '@angular/core';
import {PublicationService} from "../../services/publication.service";
import {EvenementService} from "../../services/evenement.service";
import {OutilsService} from "../../services/outils.service";
import {MemberService} from "../../services/member.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  nombrePublications : Number ;
  nombreEvenements : Number ;
  nombreOutils : Number ;
  currentList="publications"
  constructor(private memberService: MemberService , 
              private route : ActivatedRoute) {
  }

  ngOnInit(): void {

    this.memberService.getToolsByAuthorId("1").then(data=>this.nombreOutils=data.length)
    this.memberService.geteventByAuthorId("1").then(data=>this.nombreEvenements=data.length)
    this.memberService.getPostsByAuthorId("1").then(data=>this.nombrePublications=data.length)
  }

  changeCurrentListToTools(){
    this.currentList="outils"
  }

  changeCurrentListToPub(){
    this.currentList="publications"
  }

  changeCurrentListToEvents(){
    this.currentList="evenements"
    console.log(this.currentList);
    
  }
}
