import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UebersichtComponent} from './pages/uebersicht/uebersicht.component';
import {AuftragErstellenComponent} from './pages/auftrag-erstellen/auftrag-erstellen.component';
import {OffeneAuftraegeComponent} from './pages/offene-auftraege/offene-auftraege.component';
import {TerminierteAuftraegeComponent} from './pages/terminierte-auftraege/terminierte-auftraege.component';
import {InBearbeitungAuftraegeComponent} from './pages/in-bearbeitung-auftraege/in-bearbeitung-auftraege.component';
import {AbgeschlosseneAuftraegeComponent} from './pages/abgeschlossene-auftraege/abgeschlossene-auftraege.component';
import {AuftragDetailComponent} from './pages/auftrag-detail/auftrag-detail.component';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {NoAuthGuard} from './shared/guards/no-auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
  {path: 'uebersicht', component: UebersichtComponent, canActivate: [AuthGuard]},
  {path: 'auftrag-erstellen', component: AuftragErstellenComponent, canActivate: [AuthGuard]},
  {path: 'offene-auftraege', component: OffeneAuftraegeComponent, canActivate: [AuthGuard]},
  {path: 'terminierte-auftraege', component: TerminierteAuftraegeComponent, canActivate: [AuthGuard]},
  {path: 'in-bearbeitung-auftraege', component: InBearbeitungAuftraegeComponent, canActivate: [AuthGuard]},
  {path: 'abgeschlossene-auftraege', component: AbgeschlosseneAuftraegeComponent, canActivate: [AuthGuard]},
  {path: 'auftrag-detail/:auftragId', component: AuftragDetailComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
