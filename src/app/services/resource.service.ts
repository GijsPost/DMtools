import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Party } from 'src/app/Models/Party';
import { CookieService } from 'ngx-cookie';
import { Monster } from 'src/app/Models/Monster';
import { Spell } from 'src/app/Models/Spell';
import { Encounter } from 'src/app/Models/Encounter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  public readonly API_LOCATION = "assets/repository";
  public readonly MONSTERS_PATH = this.API_LOCATION+"/monsters.json";
  public readonly SPELLS_PATH = this.API_LOCATION+"/spells.json";

  constructor(private http: Http, private cookieService: CookieService) {
  }

  getActiveParty(): Party{
    var cookie = this.cookieService.getObject("active_party_cookie");
    if(cookie != null && cookie != undefined){
      return cookie as Party;
    } else{
      return null;
    } 
  }

  setActiveParty(party: Party){
    if(party != null && party != undefined){
      this.cookieService.putObject("active_party_cookie",party);
      console.log("Succesfully set new active party");
    } else{
      this.cookieService.remove("active_party_cookie");
    }
  }

  getParties(): Party[]{
    var cookie = this.cookieService.getObject("saved_parties_cookie");
    if(cookie != null && cookie != undefined){
      return cookie as Party[];
    } else{
      return null;
    } 
  }

  submitParties(parties: Party[]){
    if(parties != null && parties != undefined){
      this.cookieService.putObject("saved_parties_cookie",parties);
      console.log("successfully saved new party list");
    } else{
      console.error("Tried to save empty party list");
    }
  }

  findParty(name: string): Party{
    var parties = this.getParties();
    var party = parties.find(query=>{
      return query.party_name == name;
    });
    return party;
  }

  getLastEncounter(): Encounter{
    var cookie = this.cookieService.getObject("encounter_cookie");
    if(cookie != null && cookie != undefined){
      console.log(cookie);
      
      return cookie as Encounter;
    } else{
      return null;
    } 
  }

  addEncounter(encounter: Encounter): number{
    if(encounter != null){
      if(this.getLastEncounter() != null){
        encounter.ID = this.getLastEncounter().ID + 1;
      } else{
        encounter.ID = 0;
      }
      this.cookieService.putObject("encounter_cookie", encounter);
      console.log("successfully saved new encounter");
      return encounter.ID;
    }
    return null;
  }

}
