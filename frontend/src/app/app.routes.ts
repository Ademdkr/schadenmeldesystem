import { Routes } from '@angular/router';
import { UebersichtComponent } from './pages/uebersicht/uebersicht.component';
import { AuftragErstellenComponent } from './pages/auftrag-erstellen/auftrag-erstellen.component';
import { OffeneAuftraegeComponent } from './pages/offene-auftraege/offene-auftraege.component';
import { TerminierteAuftraegeComponent } from './pages/terminierte-auftraege/terminierte-auftraege.component';
import { InBearbeitungAuftraegeComponent } from './pages/in-bearbeitung-auftraege/in-bearbeitung-auftraege.component';
import { AbgeschlosseneAuftraegeComponent } from './pages/abgeschlossene-auftraege/abgeschlossene-auftraege.component';

export const routes: Routes = [
  { path: 'uebersicht', component: UebersichtComponent },
  { path: 'auftrag-erstellen', component: AuftragErstellenComponent },
  { path: 'offene-auftraege', component: OffeneAuftraegeComponent },
  { path: 'terminierte-auftraege', component: TerminierteAuftraegeComponent },
  { path: 'in-bearbeitung-auftraege', component: InBearbeitungAuftraegeComponent },
  { path: 'abgeschlossene-auftraege', component: AbgeschlosseneAuftraegeComponent },
  { path: '', redirectTo: '/uebersicht', pathMatch: 'full' },
];
