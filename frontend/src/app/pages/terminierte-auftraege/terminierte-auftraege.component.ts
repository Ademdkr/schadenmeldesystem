import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuftraegeService} from '../../shared/services/auftraege.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Auftrag} from '../../shared/models/auftrag.model';


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
    'abgabeTermin',
    'abgabeOrt',
    'abgabeBestaetigt'
  ];
  terminierteAuftraegeDataSource = new MatTableDataSource<Auftrag>([]);

  @ViewChild(MatPaginator) terminierteAuftraegePaginator!: MatPaginator;

  constructor(
    private auftraegeService: AuftraegeService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loadTerminierteAuftraege();
  }

  ngAfterViewInit() {
    this.initializeTable(this.terminierteAuftraegeDataSource, this.terminierteAuftraegePaginator);
  }

  loadTerminierteAuftraege() {
    /*const terminierteAuftraege = this.auftraegeService.getTerminierteAuftraege();
    this.terminierteAuftraegeDataSource.data = terminierteAuftraege;*/

    this.auftraegeService.getTerminierteAuftraege2().subscribe(
      (data) => {
        this.terminierteAuftraegeDataSource.data = data;
      },
      (error) => {
        console.error('Fehler beim Laden der terminierten Aufträge', error);
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
        abgabeTermin: null,
        abgabeOrt: null,
        abgabeBestaetigt: null,
      });
    }
    dataSource.data = filledData;
    dataSource.paginator = paginator;
  }
}
