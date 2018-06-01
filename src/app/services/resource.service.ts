import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Party } from 'src/app/Models/Party';
import { CookieService } from 'ngx-cookie';
import { Monster } from 'src/app/Models/Monster';
import { Spell } from 'src/app/Models/Spell';
import { Encounter } from 'src/app/Models/Encounter';
import { Observable } from 'rxjs';
import { StatusEffect, EnumStatusEffect } from '../Models/StatusEffect';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  public readonly API_LOCATION = "assets/repository";
  public readonly MONSTERS_PATH = this.API_LOCATION+"/monsters.json";
  public readonly SPELLS_PATH = this.API_LOCATION+"/spells.json";
  public readonly CUSTOM_MONSTER_SERVER = "https://gijspost.nl/dmtools-api/getcustoms.php";

  public statusEffects: StatusEffect[] = [];

  public get customMonsters(): Monster[]{
    return JSON.parse(localStorage.getItem("customMonsters")) as Monster[];
  }
  public set customMonsters(monsters: Monster[]){
    localStorage.setItem("customMonsters",JSON.stringify(monsters));
  }

  constructor(private http: Http, private cookieService: CookieService) {
    this.statusEffects.push({
      name: "Blinded",
      effects: EnumStatusEffect.blinded,
    },
    {
      name: "Charmed",
      effects: EnumStatusEffect.charmed,
    },
    {
      name: "Deafened",
      effects: EnumStatusEffect.deafened,
    },
    {
      name: "Frightened",
      effects: EnumStatusEffect.deafened,
    },
    {
      name: "Grappled",
      effects: EnumStatusEffect.grappled,
    },
    {
      name: "Incapacitated",
      effects: EnumStatusEffect.incapacitated,
    },
    {
      name: "Invisible",
      effects: EnumStatusEffect.invisible,
    },
    {
      name: "Paralyzed",
      effects: EnumStatusEffect.paralyzed,
    },
    {
      name: "Petrified",
      effects: EnumStatusEffect.petrified,
    },
    {
      name: "Prone",
      effects: EnumStatusEffect.prone,
    },
    {
      name: "Restrained",
      effects: EnumStatusEffect.restrained,
    },
    {
      name: "Stunned",
      effects: EnumStatusEffect.stunned,
    },
    {
      name: "Unconscious",
      effects: EnumStatusEffect.unconscious,
    },
    {
      name: "Exhausted",
      effects: EnumStatusEffect.exhaustion,
    },
    );
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
