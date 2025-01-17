import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuftragService} from '../../shared/services/auftrag.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Auftrag} from '../../shared/models/auftrag.model';
import {PaginationService} from '../../shared/utils/pagination.service';  // Importiere den Service


@Component({
  selector: 'app-in-bearbeitung-auftraege',
  templateUrl: './in-bearbeitung-auftraege.component.html',
  styleUrls: ['./in-bearbeitung-auftraege.component.css'],
  standalone: false,
})
export class InBearbeitungAuftraegeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'auftragId',
    'kennzeichen',
    'marke',
    'bearbeiter',
    'reparaturStart'
  ];
  inBearbeitungAuftraegeDataSource = new MatTableDataSource<Auftrag>([]);

  @ViewChild(MatPaginator) inBearbeitungAuftraegePaginator!: MatPaginator;

  constructor(
    private auftragService: AuftragService,
    private router: Router,
    private paginationService: PaginationService  // Service injizieren
  ) {
  }

  ngOnInit() {
    this.loadInBearbeitungAuftraege();
  }

  ngAfterViewInit() {
    this.paginationService.initializeTable(this.inBearbeitungAuftraegeDataSource, this.inBearbeitungAuftraegePaginator, 10);
  }

  loadInBearbeitungAuftraege() {
    this.auftragService.getAuftraegeByStatus('in-bearbeitung').subscribe(
      (data) => {
        this.inBearbeitungAuftraegeDataSource.data = data
        this.paginationService.initializeTable(this.inBearbeitungAuftraegeDataSource, this.inBearbeitungAuftraegePaginator, 10);
      },
      (error) => {
        console.error('Fehler beim Laden der In Bearbeitung Aufträge', error);
      }
    );
  }
}
