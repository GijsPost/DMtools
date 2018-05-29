import { Component, Inject, OnInit } from '@angular/core';
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

export class EncounterComponent implements OnInit {
    
    public monsters: Monster[];

    public enemies: Monster[] = [];
    public party: Party;
    public allies: Monster[] = [];

    public enemyToAdd: string;
    public allyToAdd: string;
    public monstersForQuery: string[] = [];

    public alliesEnabled: boolean = false;
    public noActivePartySet: boolean;

    public http: Http;
    public router: Router;

    constructor(http: Http, router: Router, private resourceService: ResourceService) {
        this.http = http;
        this.router = router;

        this.http.get(resourceService.MONSTERS_PATH).subscribe(result => {
            this.monsters = result.json() as Monster[];
            
            this.initializeAfterLoad();
        }, error => console.error(error));

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

    ngOnInit(){
    }

    initializeAfterLoad(){
        this.monsters.forEach(mon=>{
            this.monstersForQuery.push(mon.name);
        });
    }

    public addEnemy(amount: number) {
        var enemy = this.monsters.find(en=>{
            return en.name == this.enemyToAdd;
        });
        if (enemy != null && enemy != undefined) {
            if (amount != null && amount >= 1) {
                for (var i = 0; i < amount; i++) {
                    this.enemies.push(enemy);
                }
            } else {
                this.enemies.push(enemy);
            }
            this.enemyToAdd = '';
        }
    }

    public addAlly(amount: number) {
        var ally = this.monsters.find(en=>{
            return en.name == this.allyToAdd;
        });
        if (ally != null && ally != undefined) {
            if (amount != null && amount >= 1) {
                for (var i = 0; i < amount; i++) {
                    this.allies.push(ally);
                }
            } else {
                this.allies.push(ally);
            }
            this.allyToAdd = '';
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

    switchAllies(){
        this.alliesEnabled = !this.alliesEnabled;
    }

    public redirect(id: number) {
        console.log(id);
        
        this.router.navigate(['encounter/tracker']);
    }
}
