import { Component, Inject } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { forEach } from '@angular/router/src/utils/collection';
import { Monster } from '../../Models/Monster';
import { PC } from '../../Models/PC';
import { Encounter } from '../../Models/Encounter';
import { Router } from '@angular/router';
import { Party } from '../../Models/Party';

@Component({
    selector: 'encounter',
    templateUrl: './encounter.component.html',
    styleUrls:['./encounter.style.css']
})

export class EncounterComponent {

    public monsters: Monster[] = [];
    public enemies: Monster[] = [];
    public party: PC[] = [];
    public allies: Monster[] = [];
    public queryResMon: Monster[] = [];
    public queryResAlly: Monster[] = [];

    public http: Http;
    public router: Router;

    constructor(http: Http, router: Router) {
        this.http = http;
        this.router = router;

        this.http.get('https://gijspost.nl/dmtools/api/monsters').subscribe(result => {
            this.monsters = result.json() as Monster[];
        }, error => console.error(error));

        this.http.get('https://gijspost.nl/dmtools/api/parties').subscribe(party_result => {
            var parties = party_result.json() as Party[];
            this.party = parties[0].party;
        }, error => console.error(error));
    }

    public async postEncounter(ec: Encounter) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        console.log(JSON.stringify(ec));
        await this.http.post('https://gijspost.nl/dmtools/api/encounters', JSON.stringify(ec), { headers: headers }).subscribe(encounter_result => {
            if (encounter_result.ok) {
                console.log("POST succesfully send");             
                this.redirect(+encounter_result.text('iso-8859'));
            } else {
                console.error("POST failed: " + encounter_result.status);
            }
        }, error => console.log(error));
    }

    public addEnemy(value: string, amount: number) {
        if (value != null || value != "") {
            var enemy;
            enemy = this.monsters.find(enemy => enemy.name == value);
            if (enemy != undefined) {
                if (amount != null && amount >= 1) {
                    for (var i = 0; i < amount; i++) {
                        this.enemies.push(enemy);
                    }
                } else {
                    amount = 1;
                }
            } else {
                console.error("enemy '"+value+"' not found");
            }
        }
    }

    public addAlly(value: string, amount: number) {
        if (value != null || value != "") {
            var ally;
            ally = this.monsters.find(enemy => enemy.name == value);
            if (ally != undefined) {
                if (amount != null && amount >= 1) {
                    for (var i = 0; i < amount; i++) {
                        this.allies.push(ally);
                    }
                } else {
                    amount = 1;
                }
            } else {
                console.error("ally '" + value + "' not found");
            }
        }
    }

    public FindEnem(element: HTMLInputElement) {
        var found = this.monsters.filter(enemy => enemy.name.toLowerCase().indexOf(element.value.toLowerCase()) >= 0);
        if (found.length != this.monsters.length) {
            this.queryResMon = found;
        } else {
            this.queryResMon = [];
        }
    }

    public FindAlly(element: HTMLInputElement) {
        var found = this.monsters.filter(enemy => enemy.name.toLowerCase().indexOf(element.value.toLowerCase()) >= 0);
        if (found.length != this.monsters.length) {
            this.queryResAlly = found;
        } else {
            this.queryResAlly = [];
        }
    }

    public resetEnemies() {
        this.enemies = [];
    }

    public resetAllies() {
        this.allies = [];
    }

    public encounterCreate() {
        if (this.enemies != null && this.enemies.length > 0) {

            var ec: Encounter = {
                ID: 0,
                party: this.party,
                enemies: this.enemies,
                allies: this.allies,
                round: 0
            }

            this.postEncounter(ec);
        } else {
            console.error("encounterCreate() failed: list of enemies is null");
        }
    }

    public redirect(id: number) {
        console.log(id);
        
        this.router.navigate(['encounter/tracker', id]);
    }
}
