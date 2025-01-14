import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuftraegeService } from '../../shared/services/auftraege.service'; // Passe den Pfad bei Bedarf an


@Component({
  selector: 'app-terminierte-auftraege',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './terminierte-auftraege.component.html',
  styleUrls: ['./terminierte-auftraege.component.css'],
})
export class TerminierteAuftraegeComponent implements AfterViewInit {
  displayedColumns: string[] = ['auftragId', 'kennzeichen', 'marke', 'abgabeTermin', 'abgabeOrt', 'abgabeBestaetigt'];
  /*dataSource = new MatTableDataSource<any>([]);*/
  terminierteAuftraegeDataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) terminierteAuftraegePaginator!: MatPaginator;

  constructor(private auftraegeService: AuftraegeService) {}

  ngOnInit() {
    // Hole die Aufträge mit Platzhaltern
    /*const auftraege = this.auftraegeService.getAuftraegeWithPlaceholders();
    this.dataSource.data = auftraege;*/
    this.loadTerminierteAuftraege();
  }

  ngAfterViewInit() {
    // Paginator einstellen
    /*this.dataSource.paginator = this.paginator;*/
    this.initializeTable(this.terminierteAuftraegeDataSource, this.terminierteAuftraegePaginator);
  }

  loadTerminierteAuftraege() {
    // Hole die offenen Aufträge vom Service und setze sie in die DataSource
    const terminierteAuftraege = this.auftraegeService.getTerminierteAuftraege(); // Verwende die Methode deines Services, die offene Aufträge liefert
    this.terminierteAuftraegeDataSource.data = terminierteAuftraege;
  }

  initializeTable(dataSource: MatTableDataSource<any>, paginator: MatPaginator) {
    const PLACEHOLDER_ROWS = 10;
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
