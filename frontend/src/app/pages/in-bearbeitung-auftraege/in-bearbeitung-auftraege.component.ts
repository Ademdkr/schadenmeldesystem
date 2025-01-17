import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MaterialModule} from '../../shared/modules/material.module';
import {AuftraegeService} from '../../shared/services/auftraege.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator'; // Passe den Pfad bei Bedarf an
import {TableComponent} from '../../shared/components/table/table.component';


@Component({
  selector: 'app-in-bearbeitung-auftraege',
  standalone: true,
  imports: [MaterialModule, TableComponent],
  templateUrl: './in-bearbeitung-auftraege.component.html',
  styleUrls: ['./in-bearbeitung-auftraege.component.css'],
})
export class InBearbeitungAuftraegeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['auftragId', 'kennzeichen', 'marke', 'bearbeiter', 'reparaturStart'];
  // dataSource = new MatTableDataSource<any>([]);
  inBearbeitungAuftraegeDataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) inBearbeitungAuftraegePaginator!: MatPaginator;

  constructor(private auftraegeService: AuftraegeService) {
  }

  ngOnInit() {
    // Hole die Aufträge mit Platzhaltern
    /*const auftraege = this.auftraegeService.getAuftraegeWithPlaceholders();
    this.dataSource.data = auftraege;*/
    this.loadInBearbeitungAuftraege();
  }

  ngAfterViewInit() {
    // Paginator einstellen
    /*this.dataSource.paginator = this.paginator;*/
    this.initializeTable(this.inBearbeitungAuftraegeDataSource, this.inBearbeitungAuftraegePaginator);
  }

  loadInBearbeitungAuftraege() {
    // Hole die offenen Aufträge vom Service und setze sie in die DataSource
    const inBearbeitungAuftraege = this.auftraegeService.getInBearbeitungAuftraege(); // Verwende die Methode deines Services, die offene Aufträge liefert
    this.inBearbeitungAuftraegeDataSource.data = inBearbeitungAuftraege;
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
