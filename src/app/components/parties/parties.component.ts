import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { forEach } from '@angular/router/src/utils/collection';
import { Monster } from '../../Models/Monster';
import { PC } from '../../Models/PC';
import { Party } from '../../Models/Party';
import { I18NHtmlParser } from '@angular/compiler/src/i18n/i18n_html_parser';
import { CookieXSRFStrategy } from '@angular/http/src/backends/xhr_backend';
import { ResourceService } from '../../services/resource.service';
import { Router } from '@angular/router';

@Component({
    selector: 'parties',
    templateUrl: './parties.component.html'
})

export class PartiesComponent {

    public parties: Party[] = [];
    public order: string = 'name';

    constructor(private resourceService: ResourceService, private router: Router) {
        this.parties = resourceService.getParties();  
    }

    deleteParty(party){
        this.parties.splice(this.parties.indexOf(party),1);
        this.resourceService.submitParties(this.parties);
    }

    editParty(party: Party){
        this.router.navigate(['parties/edit', party.party_name]);
    }

    getActiveParty(){
        return this.resourceService.getActiveParty();
    }

    setActiveParty(party: Party){
        this.resourceService.setActiveParty(party);
    }
}

