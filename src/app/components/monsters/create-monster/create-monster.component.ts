import { Component, OnInit } from '@angular/core';
import { Monster } from 'src/app/Models/Monster';
import { MonstersComponent } from '../monsters.component';
import { Ability } from 'src/app/Models/Ability';
import { ResourceService } from '../../../services/resource.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-monster',
  templateUrl: './create-monster.component.html',
  styleUrls: ['./create-monster.component.scss']
})
export class CreateMonsterComponent implements OnInit {

  public monster: Monster;

  constructor(private resourceService: ResourceService, private router: Router) {
    this.monster = new Monster();
  }

  ngOnInit() {
  }

  addAction(){
    if(!this.monster.actions){
      this.monster.actions = [];
    }
    this.monster.actions.push(new Ability());
  }

  deleteAction(action: Ability){
    this.monster.actions.splice(this.monster.actions.indexOf(action),1);
  }

  submit(){
    if(this.monster != null){
      var arr = this.resourceService.customMonsters;
      this.monster.custom = true;
      arr.push(this.monster);
      this.resourceService.customMonsters = arr;
      this.router.navigateByUrl("monsters/custom");
    }
  }

}
