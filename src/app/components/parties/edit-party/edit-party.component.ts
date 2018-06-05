import { Component, OnInit } from '@angular/core';
import { Party } from 'src/app/Models/Party';
import { PC } from 'src/app/Models/PC';
import { ResourceService } from '../../../services/resource.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-party',
  templateUrl: './edit-party.component.html',
  styleUrls: ['./edit-party.component.scss']
})
export class EditPartyComponent implements OnInit {
  
  public party: Party;
  public oldParty: Party;
  uniqueID: number;

  constructor(private resourceService: ResourceService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.party = this.resourceService.findParty(params['party_name'] as string);
      this.oldParty = this.party;
      this.uniqueID = this.party.party.length;
    });
  }

  ngOnInit() {
  }

  checkNameAvailability(party: Party): boolean{
    var parties = this.resourceService.getParties();
    if(parties.find(e=>{ return e.party_name == party.party_name })){
      console.log('Name available!');
      return true;
    } else{
      console.log('Name already in use!');
      return false;
    }
  }

  newMember(){
    var newPC: PC = {
      name: null,
      PCclass: null,
      level: null,
      armor_class: null,
      hit_points: null,
      max_health: null,
      health_percentage: null,
      passive_perception: null,
      initiative: null,
      id: this.uniqueID++,
      conditions: [],
    };
    this.party.party.push(newPC);
  }

  removePC(pc: PC){
    this.party.party.splice(this.party.party.indexOf(pc),1);
  }

  submit(){
    var parties = this.resourceService.getParties();
    console.log(parties);
    if(parties != null && this.party != null){
      parties[parties.findIndex(value=>{ 
        return this.oldParty.party_name == value.party_name
      })] = this.party;
      console.log(parties);
      this.resourceService.submitParties(parties);
    } else{
      parties = [];
      parties.push(this.party);
      this.resourceService.submitParties(parties);
    }

    this.router.navigateByUrl("/parties");
  }

}
