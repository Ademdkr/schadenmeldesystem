import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { AuftragService } from '../../shared/services/auftrag.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Auftrag } from '../../shared/models/auftrag.model';
import { PaginationService } from '../../shared/utils/pagination.service';  // Importiere den Service

@Component({
  selector: 'app-offene-auftraege',
  templateUrl: './offene-auftraege.component.html',
  styleUrls: ['./offene-auftraege.component.css'],
  standalone: false,
})
export class OffeneAuftraegeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'auftragId',
    'kennzeichen',
    'marke',
    'fahrtuechtig',
    'standort',
    'erstelltAm',
  ];
  offeneAuftraegeDataSource = new MatTableDataSource<Auftrag>([]);

  @ViewChild(MatPaginator) offeneAuftraegePaginator!: MatPaginator;

  constructor(
    private auftragService: AuftragService,
    private paginationService: PaginationService  // Service injizieren
  ) {}

  ngOnInit() {
    this.loadOffeneAuftraege();
  }

  ngAfterViewInit() {
    this.paginationService.initializeTable(this.offeneAuftraegeDataSource, this.offeneAuftraegePaginator, 10);  // Paginierung initialisieren
  }

  loadOffeneAuftraege() {
    this.auftragService.getAuftraegeByStatus('offen').subscribe(
      (data) => {
        this.offeneAuftraegeDataSource.data = data;
        this.paginationService.initializeTable(this.offeneAuftraegeDataSource, this.offeneAuftraegePaginator, 10);  // Nach Datenladen erneut aufrufen
      },
      (error) => {
        console.error('Fehler beim Laden der offenen Aufträge', error);
      }
    );
  }
}
