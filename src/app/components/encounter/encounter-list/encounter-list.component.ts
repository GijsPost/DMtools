import { Component, OnInit } from '@angular/core';
import { Encounter } from 'src/app/Models/Encounter';
import { ResourceService } from '../../../services/resource.service';

@Component({
  selector: 'app-encounter-list',
  templateUrl: './encounter-list.component.html',
  styleUrls: ['./encounter-list.component.scss']
})
export class EncounterListComponent implements OnInit {

  savedEncounters: Encounter[];

  constructor(resourceService: ResourceService) {
    this.savedEncounters = resourceService.getEncounters();
    console.log(this.savedEncounters);
    
  }

  ngOnInit() {
  }

  formatDate(stamp: number){
    return new Date(stamp).toLocaleString();
  }

  formatEnemies(enemies: string[]){
    let enemiesString: string;
    if(enemies.length > 5){
      enemiesString = enemies.filter((en,index)=>{
        return index < 5;
      }).join(", ") + ', and some more...';
    } else{
      enemiesString = enemies.join(", ");
    }
    return enemiesString;
  }

}
