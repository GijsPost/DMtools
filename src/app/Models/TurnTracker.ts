import { Monster } from "./Monster";
import { PC } from "./PC";
import { OrderBy } from "../components/monsters/orderby";

export class TurnTracker{

    public list: (PC|Monster)[];
    private currentTurn: (PC | Monster);
    public round: number = 1;
    public turn: number = 1;

    constructor(party: PC[], enemies: Monster[], allies: Monster[]) {
        this.list = [];

        for (var i = 0; i < party.length; i++) {
            this.list.push(party[i]);
        }
        for (var i = 0; i < enemies.length; i++) {
            this.list.push(enemies[i]);
        }
        for (var i = 0; i < allies.length; i++) {
            this.list.push(allies[i]);
        }

        this.list.sort((a: PC | Monster, b: PC | Monster) => {
            return b.initiative - a.initiative;
        });

        this.currentTurn = this.list[0];

    }

    public addEntity(entity: Monster | PC){
        this.list.push(entity);
        this.list.sort((a: PC | Monster, b: PC | Monster) => {
            return b.initiative - a.initiative;
        });
    }

    public findNextTurn(): PC | Monster {
        var next = this.list[this.list.indexOf(this.currentTurn) + 1];
        if (next != null && next != undefined && (this.list.indexOf(this.currentTurn) + 1) <= this.list.length) {
            return next;
        } else {
            this.round++;
            return this.list[0];
        }
    }

    public getCurrentTurn(): PC|Monster {
        return this.currentTurn;
    }
    public setCurrentTurn(turner: PC | Monster) {
        this.currentTurn = turner;
        this.turn++;
    }
}