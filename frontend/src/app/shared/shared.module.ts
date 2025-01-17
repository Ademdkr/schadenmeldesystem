// src/app/shared/shared.module.ts
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterLink, RouterOutlet} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';

// Beispielkomponenten, Pipes oder Direktiven, die du teilen möchtest
import {AuftragErstellenComponent} from '../pages/auftrag-erstellen/auftrag-erstellen.component';
import {UebersichtComponent} from '../pages/uebersicht/uebersicht.component';
import {OffeneAuftraegeComponent} from '../pages/offene-auftraege/offene-auftraege.component';
import {TerminierteAuftraegeComponent} from '../pages/terminierte-auftraege/terminierte-auftraege.component';
import {InBearbeitungAuftraegeComponent} from '../pages/in-bearbeitung-auftraege/in-bearbeitung-auftraege.component';
import {AbgeschlosseneAuftraegeComponent} from '../pages/abgeschlossene-auftraege/abgeschlossene-auftraege.component';
import {AuftragDetailComponent} from '../pages/auftrag-detail/auftrag-detail.component';
import {DateFormatPipe} from './utils/date-format.pipe';
import {TableComponent} from './components/table/table.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';

// Angular Material Modules
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckbox} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    // Alle Komponenten, Pipes und Direktiven, die du teilen möchtest
    AuftragErstellenComponent,
    UebersichtComponent,
    OffeneAuftraegeComponent,
    TerminierteAuftraegeComponent,
    InBearbeitungAuftraegeComponent,
    AbgeschlosseneAuftraegeComponent,
    AuftragDetailComponent,
    DateFormatPipe,
    TableComponent,
    SidenavComponent
  ],
  imports: [
    // Der CommonModule muss importiert werden, wenn du grundlegende Angular-Features verwendest
    CommonModule,
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    MatPaginator,
    MatSortModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatCheckbox,
    FormsModule,
    RouterLink,
    RouterOutlet,
  ],
  exports: [
    // Alles, was du für andere Module verfügbar machen möchtest
    CommonModule,
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    MatPaginator,
    MatSortModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatCheckbox,
    FormsModule,
    RouterLink,
    RouterOutlet,
    SidenavComponent,
    TableComponent,
  ],
})
export class SharedModule {
}
