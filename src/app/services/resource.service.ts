import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Party } from 'src/app/Models/Party';
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

  public statusEffects: StatusEffect[] = [];

  public get customMonsters(): Monster[]{
    var temp = JSON.parse(localStorage.getItem("customMonsters")) as Monster[];
    if(temp){
      return temp;
    } else{
      return [];
    }
  }
  public set customMonsters(monsters: Monster[]){
    localStorage.setItem("customMonsters",JSON.stringify(monsters));
  }

  constructor(private http: Http) {
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
    return JSON.parse(localStorage.getItem("active_party")) as Party;
  }

  setActiveParty(party: Party){
    localStorage.setItem("active_party",JSON.stringify(party));
  }

  getParties(): Party[]{
    const parties = JSON.parse(localStorage.getItem("saved_parties")) as Party[];
    if(parties){
      return parties;
    } else{
      return [];
    }
  }

  submitParties(parties: Party[]){
    localStorage.setItem("saved_parties",JSON.stringify(parties));
  }

  findParty(name: string): Party{
    var parties = this.getParties();
    var party = parties.find(query=>{
      return query.party_name == name;
    });
    if(party){
      return party;
    } else{
      return null;
    }
  }

  getLastEncounter(): Encounter{
    let encounters = this.getEncounters();
    if(encounters != null){
      return encounters[encounters.length - 1];
    } else{
      console.error("No last encounter found m8");
      return null;
    }
  }

  getEncounters(): Encounter[]{
    let encounters = JSON.parse(localStorage.getItem("saved_encounters")) as Encounter[];
    if(encounters && encounters.length > 1){
      encounters = encounters.sort((a,b)=>{
        if(a.timestamp > b.timestamp){
          return 1;
        }
        if(a.timestamp < b.timestamp){
          return -1;
        } else{
          return 0;
        }
      });
    } else{
      if(encounters == null || encounters == undefined){
        encounters = [];
      }
    }
    return encounters;
  }

  addEncounter(encounter: Encounter): number{
    let encounterArray: Encounter[] = this.getEncounters();
    if(encounter != null){
      if(this.getLastEncounter() != null){
        encounter.ID = this.getLastEncounter().ID + 1;
      } else{
        encounter.ID = 0;
      }
      encounterArray.push(encounter);
      localStorage.setItem("saved_encounters",JSON.stringify(encounterArray));
      return encounter.ID;
    }
    return null;
  }

}
