import { Component, Inject } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { forEach } from '@angular/router/src/utils/collection';
import { PC } from '../../../Models/PC';
import { Monster } from '../../../Models/Monster';
import { Router, ActivatedRoute } from '@angular/router';
import { Encounter } from '../../../Models/Encounter';
import { DiceRoller } from '../../../Models/DiceRoller';
import { AbilityBonusCalculator } from '../../../Models/AbilityBonusCalculator';
import { TurnTracker } from '../../../Models/TurnTracker';
import { MonstersComponent } from '../../monsters/monsters.component';

@Component({
    selector: 'tracker',
    templateUrl: './tracker.component.html',
    styleUrls: ['./tracker.style.css']
})

export class TrackerComponent {
    public party: PC[] = [];
    public enemies: Monster[] = [];
    public allies: Monster[] = [];
    public http: Http;
    public encounter: Encounter;
    public encounterID: number;
    public round: number;

    public turnTracker: TurnTracker;
    public turn: PC | Monster;
    public turnNum: number;
    public selected: Monster;

    public router: Router;
    public dr: DiceRoller = new DiceRoller;
    public abc: AbilityBonusCalculator = new AbilityBonusCalculator;

    constructor(http: Http, router: Router, private route: ActivatedRoute) {
        this.http = http;
        this.router = router;

        this.route.params.subscribe(params => {
            this.encounterID = +params['encounterID'];
        });

        this.http.get('https://gijspost.nl/dmtools/api/encounters?id=' + this.encounterID).subscribe(result => {
            this.encounter = result.json() as Encounter;
            this.party = this.encounter.party;
            this.party.forEach(member=>{
                member.initiative = null;
            });
            this.enemies = this.encounter.enemies;
            this.allies = this.encounter.allies;
            this.round = 0;
            this.turnNum = 0;

            var knownNames: string[] = [];
            var counter: number = 0;
            for (var i = 0; i < this.enemies.length; i++) {
                if (knownNames.find(e => { return e == this.enemies[i].name; }) == this.enemies[i].name) {
                    this.enemies[i].name += " " + (counter + 1);
                    counter++;
                } else {
                    knownNames.push(this.enemies[i].name);
                    counter = 1;

                }
                this.enemies[i].max_health = this.enemies[i].hit_points;
                this.enemies[i].health_percentage = 1;
            }
            for (var i = 0; i < this.allies.length; i++) {
                if (knownNames.find(e => { return e == this.allies[i].name; }) == this.allies[i].name) {
                    this.allies[i].name += " " + (counter + 1);
                    counter++;
                } else {
                    knownNames.push(this.allies[i].name);
                    counter = 1;

                }
                this.allies[i].max_health = this.allies[i].hit_points;
                this.allies[i].health_percentage = 1;
            }
            for (var i = 0; i < this.party.length; i++) {
                this.party[i].max_health = this.party[i].hit_points;
                this.party[i].health_percentage = 1;
            }
        }, error => console.error(error));
    }

    public setInit(guy: PC|Monster, init: number) {
        guy.initiative = init;
    }
            
    public generateRollsEnemies(input: string) {
        if (input == 'indiv') {
            for (var i = 0; i < this.enemies.length; i++) {
                this.enemies[i].initiative = this.dr.roll("1d20") + this.abc.get(this.enemies[i].dexterity);
            }
        } else if (input == 'group') {
            var roll = this.dr.roll("1d20");
            for (var i = 0; i < this.enemies.length; i++) {
                this.enemies[i].initiative = roll + this.abc.get(this.enemies[i].dexterity);                
            }
        }
    }

    public generateRollsAllies(input: string) {
        if (input == 'indiv') {
            for (var i = 0; i < this.allies.length; i++) {
                this.allies[i].initiative = this.dr.roll("1d20") + this.abc.get(this.allies[i].dexterity);
            }
        } else if (input == 'group') {
            var roll = this.dr.roll("1d20");
            for (var i = 0; i < this.allies.length; i++) {
                this.allies[i].initiative = roll + this.abc.get(this.allies[i].dexterity);
            }
        }
    }

    public setHP(guy: PC | Monster, hp: number) {
        if (hp != null && hp != undefined) {
            guy.hit_points = hp;
            guy.health_percentage = guy.hit_points / guy.max_health;
        }     
    }

    public startTracker() {
        var emptyError = false;

        for (var i = 0; i < this.party.length; i++) {
            var input = (<HTMLInputElement>document.getElementById("init-"+this.party[i].name)).value; 
            if (input) {
                this.party[i].initiative = +input;
            }
            if (!this.party[i].initiative || this.party[i].initiative == 0) {
                //emptyError = true;
                //DEVMODE ONLY
                this.party[i].initiative = 10;
                //DEVMODE ONLY
            }
        }
        for (var i = 0; i < this.enemies.length; i++) {
            var input = (<HTMLInputElement>document.getElementById("init-"+this.enemies[i].name)).value; 
            if (input) {
                this.enemies[i].initiative = +input;
            }
            if (!this.enemies[i].initiative || this.enemies[i].initiative == 0) {
                //emptyError = true;
                //DEVMODE ONLY
                this.enemies[i].initiative = 10;
                //DEVMODE ONLY
            }
        }
        for (var i = 0; i < this.allies.length; i++) {
            var input = (<HTMLInputElement>document.getElementById("init-"+this.allies[i].name)).value; 
            if (input) {
                this.allies[i].initiative = +input;
            }
            if (!this.allies[i].initiative || this.allies[i].initiative == 0) {
                //emptyError = true;
                //DEVMODE ONLY
                this.allies[i].initiative = 10;
                //DEVMODE ONLY
            }
        }
        if (!emptyError) {
            this.turnTracker = new TurnTracker(this.party, this.enemies, this.allies);
            this.round++;
            this.turnNum++;
            this.turn = this.turnTracker.getCurrentTurn();
        } else {
            console.error("One or more initiative fields were left empty or un-submitted");
        }     
    }

    public nextTurn() {
        this.turnTracker.setCurrentTurn(this.turnTracker.findNextTurn());
        this.turn = this.turnTracker.getCurrentTurn();
        this.turnNum = this.turnTracker.turn;
        this.round = this.turnTracker.round;
    }

    public showMonster(monster: Monster) {
        this.selected = monster;
    }
}