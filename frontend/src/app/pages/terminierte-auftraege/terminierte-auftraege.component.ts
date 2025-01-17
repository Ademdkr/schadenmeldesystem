import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuftragService} from '../../shared/services/auftrag.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Auftrag} from '../../shared/models/auftrag.model';
import {PaginationService} from '../../shared/utils/pagination.service';  // Importiere den Service


@Component({
  selector: 'app-terminierte-auftraege',
  templateUrl: './terminierte-auftraege.component.html',
  styleUrls: ['./terminierte-auftraege.component.css'],
  standalone: false,
})
export class TerminierteAuftraegeComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'auftragId',
    'kennzeichen',
    'marke',
    'abgabeDatum',
    'abgabeOrt',
    'abgabeBestaetigt'
  ];
  terminierteAuftraegeDataSource = new MatTableDataSource<Auftrag>([]);

  @ViewChild(MatPaginator) terminierteAuftraegePaginator!: MatPaginator;

  constructor(
    private auftragService: AuftragService,
    private router: Router,
    private paginationService: PaginationService
  ) {
  }

  ngOnInit() {
    this.loadTerminierteAuftraege();
  }

  ngAfterViewInit() {
    this.paginationService.initializeTable(this.terminierteAuftraegeDataSource, this.terminierteAuftraegePaginator, 10);
  }

  loadTerminierteAuftraege() {
    this.auftragService.getAuftraegeByStatus('terminiert').subscribe(
      (data) => {
        this.terminierteAuftraegeDataSource.data = data;
        this.paginationService.initializeTable(this.terminierteAuftraegeDataSource, this.terminierteAuftraegePaginator, 10);
      },
      (error) => {
        console.error('Fehler beim Laden der terminierten Aufträge', error);
      }
    );
  }
}
