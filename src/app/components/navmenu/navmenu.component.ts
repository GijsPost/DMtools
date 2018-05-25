import { Component } from '@angular/core';
import { DiceRoller } from '../../Models/DiceRoller';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {

    version: string = "0.1.0";

    constructor(){
    }

    public roll(input: string) {
        console.log("Rolling..");
        var dr: DiceRoller = new DiceRoller;
        var output = <HTMLInputElement>document.getElementById("output");
        output.valueAsNumber = dr.roll(input);
    }
}
