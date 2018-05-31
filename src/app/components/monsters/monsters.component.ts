import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { forEach } from '@angular/router/src/utils/collection';
import { OrderBy } from './orderby';
import { Monster } from '../../Models/Monster';
import { ResourceService } from '../../services/resource.service';
import { AbilityBonusCalculator } from '../../Models/AbilityBonusCalculator';

@Component({
    selector: 'monsters',
    templateUrl: './monsters.component.html',
    styleUrls: ['./monsters.component.scss'],
})

export class MonstersComponent {

    public monsters: Monster[] = [];
    public filteredMonsters: Monster[] = [];

    public sortables: string[] = ['name','challenge_rating','strength','dexterity','constitution','wisdom','intelligence','charisma','armor_class','alignment','hit_points','size','speed','type'];
    public loaded: boolean = false;
    public layoutRow: boolean = true;

    public sortOrder: string = this.sortables[0];
    public sortOrderFlip: string = 'desc';

    public abc: AbilityBonusCalculator = new AbilityBonusCalculator;

    constructor(private resourceService: ResourceService, private http: Http) {
        this.http.get(resourceService.MONSTERS_PATH).subscribe(result => {
            this.monsters = result.json() as Monster[];
            this.monsters.map(monster=>{
                var array = monster.challenge_rating.split("/");
                var one: number = +array[0];
                var other: number = (array[1]) ? +array[1] : 1;
                monster.number_cr = one / other;
            });
            this.filteredMonsters = this.monsters
            this.loaded = true;

            this.sortBy(this.sortOrder,this.sortOrderFlip);
        }, error => console.error(error));
    }

    public filterMonster(input: string){    
        this.filteredMonsters = this.monsters.filter(query=>{
            return query.name.toLowerCase().includes(input.toLowerCase());
        });
    }

    public sortBy(sort:string, flip:string) {
        this.sortOrderFlip = flip;
        this.sortOrder = sort;
        var desc: boolean = (flip == 'desc');
        this.filteredMonsters.sort((a,b)=>{

            //CR
            if(sort == 'challenge_rating'){
                if(a.number_cr > b.number_cr){
                    if(desc){
                        return -1;
                    } else{
                        return 1;
                    }
                }
                if(a.number_cr < b.number_cr){
                    if(desc){
                        return 1;
                    } else{
                        return -1;
                    }
                }
                if(a.number_cr == b.number_cr){
                    return 0;
                }
            }

            //Strength
            if(sort == 'strength'){
                if(a.strength > b.strength){
                    if(desc){
                        return -1;
                    } else{
                        return 1;
                    }
                }
                if(a.strength < b.strength){
                    if(desc){
                        return 1;
                    } else{
                        return -1;
                    }
                }
                if(a.strength == b.strength){
                    return 0;
                }
            }

            //Strength
            if(sort == 'dexterity'){
                if(a.dexterity > b.dexterity){
                    if(desc){
                        return -1;
                    } else{
                        return 1;
                    }
                }
                if(a.dexterity < b.dexterity){
                    if(desc){
                        return 1;
                    } else{
                        return -1;
                    }
                }
                if(a.dexterity == b.dexterity){
                    return 0;
                }
            }

            //Constitution
            if(sort == 'constitution'){
                if(a.constitution > b.constitution){
                    if(desc){
                        return -1;
                    } else{
                        return 1;
                    }
                }
                if(a.constitution < b.constitution){
                    if(desc){
                        return 1;
                    } else{
                        return -1;
                    }
                }
                if(a.constitution == b.constitution){
                    return 0;
                }
            }

            //Wisdom
            if(sort == 'wisdom'){
                if(a.wisdom > b.wisdom){
                    if(desc){
                        return -1;
                    } else{
                        return 1;
                    }
                }
                if(a.wisdom < b.wisdom){
                    if(desc){
                        return 1;
                    } else{
                        return -1;
                    }
                }
                if(a.wisdom == b.wisdom){
                    return 0;
                }
            }

            //Intelligence
            if(sort == 'intelligence'){
                if(a.intelligence > b.intelligence){
                    if(desc){
                        return -1;
                    } else{
                        return 1;
                    }
                }
                if(a.intelligence < b.intelligence){
                    if(desc){
                        return 1;
                    } else{
                        return -1;
                    }
                }
                if(a.intelligence == b.intelligence){
                    return 0;
                }
            }

            //Charisma
            if(sort == 'charisma'){
                if(a.charisma > b.charisma){
                    if(desc){
                        return -1;
                    } else{
                        return 1;
                    }
                }
                if(a.charisma < b.charisma){
                    if(desc){
                        return 1;
                    } else{
                        return -1;
                    }
                }
                if(a.charisma == b.charisma){
                    return 0;
                }
            }

            //Armor Class
            if(sort == 'armor_class'){
                if(a.armor_class > b.armor_class){
                    if(desc){
                        return -1;
                    } else{
                        return 1;
                    }
                }
                if(a.armor_class < b.armor_class){
                    if(desc){
                        return 1;
                    } else{
                        return -1;
                    }
                }
                if(a.armor_class == b.armor_class){
                    return 0;
                }
            }

            //Alignment
            if(sort == 'alignment'){
                if(a.alignment > b.alignment){
                    if(desc){
                        return -1;
                    } else{
                        return 1;
                    }
                }
                if(a.alignment < b.alignment){
                    if(desc){
                        return 1;
                    } else{
                        return -1;
                    }
                }
                if(a.alignment == b.alignment){
                    return 0;
                }
            } 
            
            //HitPoints
            if(sort == 'hit_points'){
                if(a.hit_points > b.hit_points){
                    if(desc){
                        return -1;
                    } else{
                        return 1;
                    }
                }
                if(a.hit_points < b.hit_points){
                    if(desc){
                        return 1;
                    } else{
                        return -1;
                    }
                }
                if(a.hit_points == b.hit_points){
                    return 0;
                }
            }
            
            //Size
            if(sort == 'size'){
                if(a.size > b.size){
                    if(desc){
                        return -1;
                    } else{
                        return 1;
                    }
                }
                if(a.size < b.size){
                    if(desc){
                        return 1;
                    } else{
                        return -1;
                    }
                }
                if(a.size == b.size){
                    return 0;
                }
            }

            //Speed
            if(sort == 'speed'){
                if(a.speed > b.speed){
                    if(desc){
                        return -1;
                    } else{
                        return 1;
                    }
                }
                if(a.speed < b.speed){
                    if(desc){
                        return 1;
                    } else{
                        return -1;
                    }
                }
                if(a.speed == b.speed){
                    return 0;
                }
            }

            //Type
            if(sort == 'type'){
                if(a.type > b.type){
                    if(desc){
                        return -1;
                    } else{
                        return 1;
                    }
                }
                if(a.type < b.type){
                    if(desc){
                        return 1;
                    } else{
                        return -1;
                    }
                }
                if(a.type == b.type){
                    return 0;
                }
            }

            //DEFAULT: NAME
            if(a.name > b.name){
                if(desc){
                    return -1;
                } else{
                    return 1;
                }
            }
            if(a.name < b.name){
                if(desc){
                    return 1;
                } else{
                    return -1;
                }
            }
            if(a.name == b.name){
                return 0;
            }
            
        });
    }

}

