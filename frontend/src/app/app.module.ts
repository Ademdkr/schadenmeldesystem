import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

import {RouterOutlet} from '@angular/router';
import {SidenavComponent} from './shared/components/sidenav/sidenav.component';
import {MaterialModule} from './shared/modules/material.module';
import {AuftragErstellenComponent} from './pages/auftrag-erstellen/auftrag-erstellen.component';
import {FormsModule} from '@angular/forms';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {OffeneAuftraegeComponent} from './pages/offene-auftraege/offene-auftraege.component';
import {TableComponent} from './shared/components/table/table.component';
import {TerminierteAuftraegeComponent} from './pages/terminierte-auftraege/terminierte-auftraege.component';
import {InBearbeitungAuftraegeComponent} from './pages/in-bearbeitung-auftraege/in-bearbeitung-auftraege.component';
import {AbgeschlosseneAuftraegeComponent} from './pages/abgeschlossene-auftraege/abgeschlossene-auftraege.component';
import {AuftragDetailComponent} from './pages/auftrag-detail/auftrag-detail.component';
import {UebersichtComponent} from './pages/uebersicht/uebersicht.component';

@NgModule({
  declarations: [
    AppComponent,
    AuftragErstellenComponent,
    UebersichtComponent,
    OffeneAuftraegeComponent,
    TerminierteAuftraegeComponent,
    InBearbeitungAuftraegeComponent,
    AbgeschlosseneAuftraegeComponent,
    AuftragDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    SidenavComponent,
    MaterialModule,
    FormsModule,
    TableComponent,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
