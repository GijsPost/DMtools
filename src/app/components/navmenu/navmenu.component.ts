import { Component } from '@angular/core';
import { DiceRoller } from '../../Models/DiceRoller';
import { ResourceService } from '../../services/resource.service';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {

    version: string = "0.1.1";

    get activeParty():string{
        if(this.resourceService.getActiveParty() != null){
            return this.resourceService.getActiveParty().party_name;
        } else{
            return "None"
        }
    }

    constructor(private resourceService: ResourceService){
    }

    public roll(input: string) {
        console.log("Rolling..");
        var dr: DiceRoller = new DiceRoller;
        var output = <HTMLInputElement>document.getElementById("output");
        output.valueAsNumber = dr.roll(input);
    }
}
