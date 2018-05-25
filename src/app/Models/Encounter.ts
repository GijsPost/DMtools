import { Monster } from "./Monster";
import { PC } from "./PC";

export interface Encounter {

    ID: number;
    party: PC[];
    enemies: Monster[];
    allies: Monster[];
    round: number;

}