import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-uebersicht',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.css']
})
export class UebersichtComponent implements AfterViewInit {
  offeneAuftraegeDisplayedColumns: string[] = ['auftragId', 'kennzeichen', 'marke', 'fahrtuechtig', 'standort', 'erstelltAm'];
  terminierteAuftraegeDisplayedColumns: string[] = ['auftragId', 'kennzeichen', 'marke', 'abgabeTermin', 'abgabeOrt', 'abgabeBestaetigt'];
  inBearbeitungAuftraegeDisplayedColumns: string[] = ['auftragId', 'kennzeichen', 'marke', 'bearbeiter', 'reparaturStart'];

  offeneAuftraegeDataSource = new MatTableDataSource<any>([]);
  terminierteAuftraegeDataSource = new MatTableDataSource<any>([]);
  inBearbeitungAuftraegeDataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) offeneAuftraegePaginator!: MatPaginator;
  @ViewChild(MatPaginator) terminierteAuftraegePaginator!: MatPaginator;
  @ViewChild(MatPaginator) inBearbeitungAuftraegePaginator!: MatPaginator;

  ngAfterViewInit() {
    this.initializeTable(this.offeneAuftraegeDataSource, this.offeneAuftraegePaginator);
    this.initializeTable(this.terminierteAuftraegeDataSource, this.terminierteAuftraegePaginator);
    this.initializeTable(this.inBearbeitungAuftraegeDataSource, this.inBearbeitungAuftraegePaginator);
  }

  initializeTable(dataSource: MatTableDataSource<any>, paginator: MatPaginator) {
    const PLACEHOLDER_ROWS = 3;
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
