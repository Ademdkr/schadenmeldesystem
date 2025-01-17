import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuftraegeService} from '../../shared/services/auftraege.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Auftrag} from '../../shared/models/auftrag.model';


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
    private auftraegeService: AuftraegeService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loadInBearbeitungAuftraege();
  }

  ngAfterViewInit() {
    this.initializeTable(this.inBearbeitungAuftraegeDataSource, this.inBearbeitungAuftraegePaginator);
  }

  loadInBearbeitungAuftraege() {
    /*const inBearbeitungAuftraege = this.auftraegeService.getInBearbeitungAuftraege();
    this.inBearbeitungAuftraegeDataSource.data = inBearbeitungAuftraege;*/

    this.auftraegeService.getInBearbeitungAuftraege2().subscribe(
      (data) => {
        this.inBearbeitungAuftraegeDataSource.data = data;
      },
      (error) => {
        console.error('Fehler beim Laden der In Bearbeitung Aufträge', error);
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
