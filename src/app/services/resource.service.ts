import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Party } from 'src/app/Models/Party';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: Http, private cookieService: CookieService) {
    this.getActiveParty();
  }

  getActiveParty(){
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
      console.error("Failed to set new active party");
    }
  }

  getParties(): Party[]{
    // this.http.get('https://gijspost.nl/dmtools/api/parties').subscribe(result => {
    //   return result.json() as Party[];
    // }, error => console.error(error));
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
}
