import { Component, Inject } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { forEach } from '@angular/router/src/utils/collection';
import { Monster } from '../../Models/Monster';
import { PC } from '../../Models/PC';
import { Encounter } from '../../Models/Encounter';
import { Router } from '@angular/router';
import { Party } from '../../Models/Party';
import { ResourceService } from '../../services/resource.service';

@Component({
    selector: 'encounter',
    templateUrl: './encounter.component.html',
    styleUrls:['./encounter.style.css']
})

export class EncounterComponent {
    
    public get monsters() : Monster[] {
        return this.resourceService.getMonsters();
    }

    public enemies: Monster[] = [];
    public party: Party;
    public allies: Monster[] = [];
    public queryResMon: Monster[] = [];
    public queryResAlly: Monster[] = [];

    public noActivePartySet: boolean;

    public http: Http;
    public router: Router;

    constructor(http: Http, router: Router, private resourceService: ResourceService) {
        this.http = http;
        this.router = router;

        if(this.resourceService.getActiveParty() == null){
            this.noActivePartySet = true;
        } else{
            if(this.resourceService.getActiveParty().party.length <= 0){
                this.noActivePartySet = true;
            }
            this.noActivePartySet = false;
            this.party = this.resourceService.getActiveParty();
        }
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
                party: this.party.party_name,
                enemies: this.enemies.map(en=>{ return en.name }),
                allies: this.allies.map(al=>{ return al.name }),
                round: 0
            }

            this.redirect(this.resourceService.addEncounter(ec));
        } else {
            console.error("encounterCreate() failed: list of enemies is null");
        }
    }

    public redirect(id: number) {
        console.log(id);
        
        this.router.navigate(['encounter/tracker', id]);
    }
}
