import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UebersichtComponent} from './pages/uebersicht/uebersicht.component';
import {AuftragErstellenComponent} from './pages/auftrag-erstellen/auftrag-erstellen.component';
import {AuftragDetailComponent} from './pages/auftrag-detail/auftrag-detail.component';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {NoAuthGuard} from './shared/guards/no-auth.guard';
import {AuftragTabelleComponent} from './pages/auftrag-tabelle/auftrag-tabelle.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
  {path: 'uebersicht', component: UebersichtComponent, canActivate: [AuthGuard]},
  {path: 'auftrag-erstellen', component: AuftragErstellenComponent, canActivate: [AuthGuard]},
  {path: 'auftrag-tabelle/:status', component: AuftragTabelleComponent, canActivate: [AuthGuard]},
  {path: 'auftrag-detail/:auftragId', component: AuftragDetailComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
