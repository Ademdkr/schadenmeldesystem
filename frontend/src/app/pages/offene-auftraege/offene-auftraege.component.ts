import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuftraegeService } from '../../shared/services/auftraege.service'; // Passe den Pfad bei Bedarf an

@Component({
  selector: 'app-offene-auftraege',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './offene-auftraege.component.html',
  styleUrls: ['./offene-auftraege.component.css'],
})
export class OffeneAuftraegeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['auftragId', 'kennzeichen', 'marke', 'fahrttauglich', 'standort', 'erstelltAm'];
  /*dataSource = new MatTableDataSource<any>([]);*/
  offeneAuftraegeDataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) offeneAuftraegePaginator!: MatPaginator;

  constructor(private auftraegeService: AuftraegeService) {}

  ngOnInit() {
    // Hole die Aufträge mit Platzhaltern
    /*const auftraege = this.auftraegeService.getAuftraegeWithPlaceholders();
    this.dataSource.data = auftraege;*/
    this.loadOffeneAuftraege();
  }

  ngAfterViewInit() {
    // Paginator einstellen
    /*this.dataSource.paginator = this.paginator;*/
    this.initializeTable(this.offeneAuftraegeDataSource, this.offeneAuftraegePaginator);
  }

  loadOffeneAuftraege() {
    // Hole die offenen Aufträge vom Service und setze sie in die DataSource
    const offeneAuftraege = this.auftraegeService.getOffeneAuftraege(); // Verwende die Methode deines Services, die offene Aufträge liefert
    this.offeneAuftraegeDataSource.data = offeneAuftraege;
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
