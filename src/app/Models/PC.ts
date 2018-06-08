import { StatusEffect } from "./StatusEffect";

export interface PC {
    name: string;
    PCclass: string;
    level: number;
    armor_class: number;
    hit_points: number;
    max_health: number;
    health_percentage: number;
    passive_perception: number;

    initiative: any;
    id: any;

    conditions: StatusEffect[];
}