import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuftraegeService } from '../../shared/services/auftraege.service'; // Passe den Pfad bei Bedarf an

@Component({
  selector: 'app-offene-auftraege',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, RouterLink],
  templateUrl: './offene-auftraege.component.html',
  styleUrls: ['./offene-auftraege.component.css'],
})
export class OffeneAuftraegeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'auftragId',
    'kennzeichen',
    'marke',
    'fahrttauglich',
    'standort',
    'erstelltAm',
  ];
  offeneAuftraegeDataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) offeneAuftraegePaginator!: MatPaginator;

  constructor(
    private auftraegeService: AuftraegeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadOffeneAuftraege();
  }

  ngAfterViewInit() {
    this.initializeTable(this.offeneAuftraegeDataSource, this.offeneAuftraegePaginator);
  }

  loadOffeneAuftraege() {
    // Hole die offenen Aufträge vom Service und setze sie in die DataSource
    const offeneAuftraege = this.auftraegeService.getOffeneAuftraege();
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
        fahrtuechtig: null,
        standort: null,
        erstelltAm: null,
      });
    }
    dataSource.data = filledData;
    dataSource.paginator = paginator;
  }

  navigateToDetail(auftragId: number) {
    // Navigiere zur Detailansicht
    this.router.navigate(['/auftrag-detail', auftragId]);
  }
}
