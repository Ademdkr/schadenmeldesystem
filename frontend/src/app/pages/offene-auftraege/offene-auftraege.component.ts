import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuftraegeService} from '../../shared/services/auftraege.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Auftrag} from '../../shared/models/auftrag.model'; // Passe den Pfad bei Bedarf an

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
    private auftraegeService: AuftraegeService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loadOffeneAuftraege();
  }

  ngAfterViewInit() {
    this.initializeTable(this.offeneAuftraegeDataSource, this.offeneAuftraegePaginator);
  }

  loadOffeneAuftraege() {
    // Hole die offenen Aufträge vom Service und setze sie in die DataSource
    /*const offeneAuftraege = this.auftraegeService.getOffeneAuftraege();
    this.offeneAuftraegeDataSource.data = offeneAuftraege;*/

    this.auftraegeService.getOffeneAuftraege2().subscribe(
      (data) => {
        this.offeneAuftraegeDataSource.data = data;
      },
      (error) => {
        console.error('Fehler beim Laden der offenen Aufträge', error);
      }
    );
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
}
