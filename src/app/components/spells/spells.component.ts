import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { forEach } from '@angular/router/src/utils/collection';
import { Monster } from '../../Models/Monster';
import { Spell } from '../../Models/Spell';

@Component({
    selector: 'spells',
    templateUrl: './spells.component.html'
})

export class SpellsComponent {

    public spells: Spell[];
    public loaded: boolean = false;

    constructor(http: Http) {
        http.get('https://gijspost.nl/dmtools/api/spells').subscribe(result => {
            this.spells = result.json() as Spell[];
            this.loaded = true;
        }, error => console.error(error));
    }

}

