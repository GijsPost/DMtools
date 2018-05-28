import { Monster } from "./Monster";
import { PC } from "./PC";

export interface Encounter {

    ID: number;
    party: string;
    enemies: string[];
    allies: string[];
    round: number;

}