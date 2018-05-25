import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
        SpellsComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'monsters', component: MonstersComponent },
            { path: 'encounter', component: EncounterComponent },
            { path: 'parties', component: PartiesComponent },
            { path: 'spells', component: SpellsComponent },
            { path: 'encounter/tracker/:encounterID', component: TrackerComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [ ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
