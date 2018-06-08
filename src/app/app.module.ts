import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { MonstersComponent } from './components/monsters/monsters.component';
import { OrderBy } from './components/monsters/orderby';
import { EncounterComponent } from './components/encounter/encounter.component';
import { TrackerComponent } from './components/encounter/tracker/tracker.component';
import { PartiesComponent } from './components/parties/parties.component';
import { SpellsComponent } from './components/spells/spells.component';
import { CreatePartyComponent } from './components/parties/create-party/create-party.component';
import { ResourceService } from './services/resource.service';
import { EditPartyComponent } from './components/parties/edit-party/edit-party.component';

import { TypeaheadModule, PopoverModule  } from 'ngx-bootstrap';

import fallback from 'express-history-api-fallback'
import express from 'express';
import { CreateMonsterComponent } from './components/monsters/create-monster/create-monster.component';
import { CustomMonstersComponent } from './components/monsters/custom-monsters/custom-monsters.component';
import { EncounterListComponent } from './components/encounter/encounter-list/encounter-list.component';
import { MonsterCardComponent } from './components/monsters/monster-card/monster-card.component';
import { PrivacyNoticeComponent } from './components/privacy-notice/privacy-notice.component'

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        MonstersComponent,
        EncounterComponent,
        PartiesComponent,
        OrderBy,
        TrackerComponent,
        SpellsComponent,
        CreatePartyComponent,
        EditPartyComponent,
        CreateMonsterComponent,
        CustomMonstersComponent,
        EncounterListComponent,
        MonsterCardComponent,
        PrivacyNoticeComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'privacy-policy', component: PrivacyNoticeComponent },
            { path: 'monsters', component: MonstersComponent },
            { path: 'monsters/custom', component: CustomMonstersComponent },
            { path: 'monsters/custom/create', component: CreateMonsterComponent },
            { path: 'encounter', component: EncounterComponent },
            { path: 'parties', component: PartiesComponent },
            { path: 'parties/new', component: CreatePartyComponent },
            { path: 'parties/edit/:party_name', component: EditPartyComponent},
            { path: 'spells', component: SpellsComponent },
            { path: 'encounter/tracker', component: TrackerComponent },
            { path: 'encounter/tracker/:encounterID', component: TrackerComponent },
            { path: 'encounter/list', component: EncounterListComponent },
            { path: '**', redirectTo: 'home' }
        ]),
        TypeaheadModule.forRoot(),
        PopoverModule.forRoot(),
    ],
    providers: [ ResourceService ],
    bootstrap: [AppComponent],
})
export class AppModule {}