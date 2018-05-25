import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Party } from 'src/app/Models/Party';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: Http) { }

  getParties(){
    this.http.get('https://gijspost.nl/dmtools/api/parties').subscribe(result => {
      return result.json() as Party[];
    }, error => console.error(error));
  }

  submitParties(){

  }
}
