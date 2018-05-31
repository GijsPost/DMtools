import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { forEach } from '@angular/router/src/utils/collection';
import { Monster } from '../../Models/Monster';
import { Spell } from '../../Models/Spell';
import { ResourceService } from '../../services/resource.service';

@Component({
    selector: 'spells',
    templateUrl: './spells.component.html',
    styleUrls: ['./spells.component.scss'],
})

export class SpellsComponent {

    public sortables: string[] = ['name','level'];
    public classes: string[] = ["Wizard","Cleric","Sorcerer","Druid","Bard","Warlock","Ranger","Paladin","Ritual Caster"];
    public sortOrder: string;
    public sortOrderFlip: string;
    public sortClass: string = 'All';

    public spells: Spell[];
    public filteredSpells: Spell[] = [];
    public loaded: boolean = false;
    public layoutRow: boolean = true;

    constructor(private resourceService: ResourceService, private http: Http) {
        this.http.get(resourceService.SPELLS_PATH).subscribe(result => {
            this.spells = result.json() as Spell[];
            console.log(this.spells);
            
            this.spells.map(spell=>{
                var levelArray = spell.level.split(RegExp("[^0-9]"));
                var level: number = +levelArray[0];        
                spell.level_nr = level;

                spell.SPClasses = spell.SPclass.split(", ");
            });
            this.filteredSpells = this.spells;
            this.loaded = true;
        }, error => console.error(error));
        this.sortBy(this.sortables[0],'asc');
    }
    
    filterSpells(input: string, classe?: string){
        if(classe){
            this.sortClass = classe;
        }
        this.filteredSpells = this.spells.filter(spell=>{
            if(this.sortClass != 'All'){
                return spell.SPClasses.includes(this.sortClass);
            } else{
                return true;
            }
        }).filter(spell=>{
            return spell.name.toLowerCase().includes(input.toLowerCase());
        });  
    }

    sortBy(sort: string, flip: string){
        this.sortOrderFlip = flip;
        this.sortOrder = sort;
        var desc: boolean = (flip == 'desc');
        this.filteredSpells.sort((a,b)=>{

            //Level
            if(sort == 'level'){
                if(a.level_nr > b.level_nr){
                    if(desc){
                        return -1;
                    } else{
                        return 1;
                    }
                }
                if(a.level_nr < b.level_nr){
                    if(desc){
                        return 1;
                    } else{
                        return -1;
                    }
                }
                if(a.level_nr == b.level_nr){
                    return 0;
                }
            }

            //School
            if(sort == 'school'){
                if(a.school > b.school){
                    if(desc){
                        return -1;
                    } else{
                        return 1;
                    }
                }
                if(a.school < b.school){
                    if(desc){
                        return 1;
                    } else{
                        return -1;
                    }
                }
                if(a.school == b.school){
                    return 0;
                }
            }

            //Duration
            if(sort == 'duration'){
                if(a.duration > b.duration){
                    if(desc){
                        return -1;
                    } else{
                        return 1;
                    }
                }
                if(a.duration < b.duration){
                    if(desc){
                        return 1;
                    } else{
                        return -1;
                    }
                }
                if(a.duration == b.duration){
                    return 0;
                }
            }

            //Casting time
            if(sort == 'casting_time'){
                if(a.casting_time > b.casting_time){
                    if(desc){
                        return -1;
                    } else{
                        return 1;
                    }
                }
                if(a.casting_time < b.casting_time){
                    if(desc){
                        return 1;
                    } else{
                        return -1;
                    }
                }
                if(a.casting_time == b.casting_time){
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

