import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AuftraegeService } from '../../shared/services/auftraege.service'; // Füge den Import des Services hinzu

@Component({
  selector: 'app-uebersicht',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.css']
})
export class UebersichtComponent implements OnInit, AfterViewInit {
  offeneAuftraegeDisplayedColumns: string[] = ['auftragId', 'kennzeichen', 'marke', 'fahrtuechtig', 'standort', 'erstelltAm'];
  terminierteAuftraegeDisplayedColumns: string[] = ['auftragId', 'kennzeichen', 'marke', 'abgabeTermin', 'abgabeOrt', 'abgabeBestaetigt'];
  inBearbeitungAuftraegeDisplayedColumns: string[] = ['auftragId', 'kennzeichen', 'marke', 'bearbeiter', 'reparaturStart'];

  offeneAuftraegeDataSource = new MatTableDataSource<any>([]);
  terminierteAuftraegeDataSource = new MatTableDataSource<any>([]);
  inBearbeitungAuftraegeDataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) offeneAuftraegePaginator!: MatPaginator;
  @ViewChild(MatPaginator) terminierteAuftraegePaginator!: MatPaginator;
  @ViewChild(MatPaginator) inBearbeitungAuftraegePaginator!: MatPaginator;

  constructor(private auftraegeService: AuftraegeService) {}

  ngOnInit() {
    // Lade die echten Aufträge aus dem AuftraegeService
    this.loadOffeneAuftraege();
    this.loadTerminierteAuftraege();
    this.loadInBearbeitungAuftraege();
  }

  ngAfterViewInit() {
    this.initializeTable(this.offeneAuftraegeDataSource, this.offeneAuftraegePaginator);
    this.initializeTable(this.terminierteAuftraegeDataSource, this.terminierteAuftraegePaginator);
    this.initializeTable(this.inBearbeitungAuftraegeDataSource, this.inBearbeitungAuftraegePaginator);
  }

  loadOffeneAuftraege() {
    // Hole die offenen Aufträge vom Service und setze sie in die DataSource
    const offeneAuftraege = this.auftraegeService.getOffeneAuftraege();// Verwende die Methode deines Services, die offene Aufträge liefert
    this.offeneAuftraegeDataSource.data = offeneAuftraege;
  }

  loadTerminierteAuftraege() {
    const terminierteAuftraege = this.auftraegeService.getTerminierteAuftraege()
    this.terminierteAuftraegeDataSource.data = terminierteAuftraege;
  }

  loadInBearbeitungAuftraege() {
    const inBearbeitungAuftraege = this.auftraegeService.getInBearbeitungAuftraege();
    this.inBearbeitungAuftraegeDataSource.data = inBearbeitungAuftraege;
  }

  initializeTable(dataSource: MatTableDataSource<any>, paginator: MatPaginator) {
    const PLACEHOLDER_ROWS = 3;
    const filledData = [...dataSource.data];
    while (filledData.length < PLACEHOLDER_ROWS) {
      filledData.push({
        auftragId: null,
        kennzeichen: null,
        marke: null,
        fahrtuechtig: null, // Platzhalter für boolean
        standort: null,
        erstelltAm: null,
      });
    }
    dataSource.data = filledData;
    dataSource.paginator = paginator;
  }
}
