import { Ability } from "./Ability";
import { StatusEffect } from "./StatusEffect";

export class Monster {

    custom: boolean = false;

    name: string;
    size: string;
    type: string;
    subtype: string;
    alignment: string;
    speed: string;

    challenge_rating: string;
    number_cr: number;

    language: string;
    senses: string;

    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;

    initiative: number;

    armor_class: number;
    hit_points: number;
    health_percentage: number;
    max_health: number;
    hit_dice: string;
    perception: number;
    damage_vulnerabilities: string;
    damage_resistances: string;
    damage_immunities: string;
    condition_immunities: string;

    actions: Ability[];
    special_abilities: Ability[];
    legendary_actions: Ability[];

    conditions: StatusEffect[];
}