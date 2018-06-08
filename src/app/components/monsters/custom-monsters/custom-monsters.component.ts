import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';
import { Monster } from 'src/app/Models/Monster';
import { AbilityBonusCalculator } from '../../../Models/AbilityBonusCalculator';

@Component({
  selector: 'app-custom-monsters',
  templateUrl: './custom-monsters.component.html',
  styleUrls: ['./custom-monsters.component.scss']
})
export class CustomMonstersComponent implements OnInit {

  public selected: Monster;
  public abc: AbilityBonusCalculator;

  constructor(public resourceService: ResourceService) {
    this.abc = new AbilityBonusCalculator;
  }

  downloadMonsters(){
    if(this.resourceService.customMonsters != null && this.resourceService.customMonsters.length > 0){
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.resourceService.customMonsters));
      var exportName = "CustomMonsters";
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", exportName + ".monsters");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  }

  removeMonster(monster: Monster){
    if(this.resourceService.customMonsters.length > 1){
      var arr = this.resourceService.customMonsters;
      this.resourceService.customMonsters = arr.splice(arr.indexOf(monster),1);
    } else{
      this.resourceService.customMonsters = [];
    }
  }

  fileUpload(e) {
    var input = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      var newMonsters = JSON.parse(fileReader.result) as Monster[];
      if(newMonsters){
        this.resourceService.customMonsters = newMonsters;
      }
    }
    fileReader.readAsText(input);
  }

  ngOnInit() {
  }

}
