import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { forEach } from '@angular/router/src/utils/collection';
import { OrderBy } from './orderby';
import { Monster } from '../../Models/Monster';
import { ResourceService } from '../../services/resource.service';

@Component({
    selector: 'monsters',
    templateUrl: './monsters.component.html'
})

export class MonstersComponent {

    public monsters: Monster[] = [];
    public order: string = 'name';
    public loaded: boolean = false;

    constructor(private resourceService: ResourceService, private http: Http) {
        this.http.get(resourceService.MONSTERS_PATH).subscribe(result => {
            this.monsters = result.json() as Monster[];
            console.log(this.monsters);
            this.loaded = true;
        }, error => console.error(error));
    }

    public sortBy(sort:string) {
        switch (sort) {
            default: this.order = 'name';
            case 'name': this.order = 'name';
            case 'cr': this.order = 'challenge_rating';
        }
    }

}

