import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { forEach } from '@angular/router/src/utils/collection';
import { Monster } from '../../Models/Monster';
import { PC } from '../../Models/PC';
import { Party } from '../../Models/Party';
import { I18NHtmlParser } from '@angular/compiler/src/i18n/i18n_html_parser';
import { CookieXSRFStrategy } from '@angular/http/src/backends/xhr_backend';

@Component({
    selector: 'parties',
    templateUrl: './parties.component.html'
})

export class PartiesComponent {

    public parties: Party[] = [];
    public order: string = 'name';

    constructor(http: Http) {
        http.get('https://gijspost.nl/dmtools/api/parties').subscribe(result => {
            this.parties = result.json() as Party[];
        }, error => console.error(error));
    }

    public saveParty() {
        
    }
}

