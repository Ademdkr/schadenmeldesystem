import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {AuftraegeService} from '../../shared/services/auftraege.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {Auftrag} from '../../shared/models/auftrag.model'; // Passe den Pfad bei Bedarf an


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
    private auftraegeService: AuftraegeService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loadAbgeschlosseneAuftraege();
  }

  ngAfterViewInit() {
    this.initializeTable(this.abgeschlosseneAuftraegeDataSource, this.abgeschlosseneAuftraegePaginator);
  }

  loadAbgeschlosseneAuftraege() {
    /*const abgeschlosseneAuftraege = this.auftraegeService.getAbgeschlosseneAuftraege(); // Verwende die Methode deines Services, die offene Aufträge liefert
    this.abgeschlosseneAuftraegeDataSource.data = abgeschlosseneAuftraege;*/

    this.auftraegeService.getAbgeschlosseneAuftraege2().subscribe(
      (data) => {
        this.abgeschlosseneAuftraegeDataSource.data = data;
      },
      (error) => {
        console.error('Fehler beim Laden der abgeschlossenen Aufträge', error);
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
        fahrtuechtig: null, // Platzhalter für boolean
        standort: null,
        erstelltAm: null,
      });
    }
    dataSource.data = filledData;
    dataSource.paginator = paginator;
  }
}
