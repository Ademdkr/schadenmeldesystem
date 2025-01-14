import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {AuftraegeService} from '../../shared/services/auftraege.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-abgeschlossene-auftraege',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, RouterLink],
  templateUrl: './abgeschlossene-auftraege.component.html',
  styleUrls: ['./abgeschlossene-auftraege.component.css'],
})
export class AbgeschlosseneAuftraegeComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['auftragId', 'kennzeichen', 'marke', 'bearbeiter', 'reparaturStart', 'reparaturEnde'];
  // dataSource = new MatTableDataSource<any>([]);
  abgeschlosseneAuftraegeDataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) abgeschlosseneAuftraegePaginator!: MatPaginator;

  constructor(private auftraegeService: AuftraegeService) {}

  ngOnInit() {
    // Hole die Aufträge mit Platzhaltern
    /*const auftraege = this.auftraegeService.getAuftraegeWithPlaceholders();
    this.dataSource.data = auftraege;*/
    this.loadAbgeschlosseneAuftraege();
  }

  ngAfterViewInit() {
    // Paginator einstellen
    /*this.dataSource.paginator = this.paginator;*/
    this.initializeTable(this.abgeschlosseneAuftraegeDataSource, this.abgeschlosseneAuftraegePaginator);
  }

  loadAbgeschlosseneAuftraege() {
    // Hole die offenen Aufträge vom Service und setze sie in die DataSource
    const abgeschlosseneAuftraege = this.auftraegeService.getAbgeschlosseneAuftraege(); // Verwende die Methode deines Services, die offene Aufträge liefert
    this.abgeschlosseneAuftraegeDataSource.data = abgeschlosseneAuftraege;
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
