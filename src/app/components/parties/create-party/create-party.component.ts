import { Component, OnInit } from '@angular/core';
import { Party } from 'src/app/Models/Party';
import { PC } from 'src/app/Models/PC';
import { ResourceService } from '../../../services/resource.service';

@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.scss']
})
export class CreatePartyComponent implements OnInit {

  constructor(private resourceService: ResourceService) { }

  public party: Party = {
    party_name: null,
    party: []
  };

  uniqueID: number = 0;

  ngOnInit() {
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
      initiative: null,
      id: this.uniqueID++
    };
    this.party.party.push(newPC);
  }

  removePC(pc: PC){
    this.party.party.splice(this.party.party.indexOf(pc),1);
  }

  submit(){
    var parties = this.resourceService.getParties();
  }

}
