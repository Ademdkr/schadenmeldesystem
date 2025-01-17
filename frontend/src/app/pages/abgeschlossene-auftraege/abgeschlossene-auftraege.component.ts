import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {AuftragService} from '../../shared/services/auftrag.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Auftrag} from '../../shared/models/auftrag.model'; // Passe den Pfad bei Bedarf an
import {PaginationService} from '../../shared/utils/pagination.service';  // Importiere den Service


@Component({
  selector: 'app-abgeschlossene-auftraege',
  templateUrl: './abgeschlossene-auftraege.component.html',
  styleUrls: ['./abgeschlossene-auftraege.component.css'],
  standalone: false,
})
export class AbgeschlosseneAuftraegeComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'auftragId',
    'kennzeichen',
    'marke',
    'bearbeiter',
    'reparaturStart',
    'reparaturEnde'
  ];
  abgeschlosseneAuftraegeDataSource = new MatTableDataSource<Auftrag>([]);

  @ViewChild(MatPaginator) abgeschlosseneAuftraegePaginator!: MatPaginator;

  constructor(
    private auftragService: AuftragService,
    private paginationService: PaginationService  // Service injizieren
  ) {
  }

  ngOnInit() {
    this.loadAbgeschlosseneAuftraege();
  }

  ngAfterViewInit() {
    this.paginationService.initializeTable(this.abgeschlosseneAuftraegeDataSource, this.abgeschlosseneAuftraegePaginator, 10);
  }

  loadAbgeschlosseneAuftraege() {
    this.auftragService.getAuftraegeByStatus('abgeschlossen').subscribe(
      (data) => {
        this.abgeschlosseneAuftraegeDataSource.data = data
        this.paginationService.initializeTable(this.abgeschlosseneAuftraegeDataSource, this.abgeschlosseneAuftraegePaginator, 10);

      },
      (error) => {
        console.error('Fehler beim Laden der abgeschlossenen Aufträge', error);
      }
    );
  }
}
