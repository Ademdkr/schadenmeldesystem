import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-terminierte-auftraege',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './terminierte-auftraege.component.html',
  styleUrls: ['./terminierte-auftraege.component.css'],
})
export class TerminierteAuftraegeComponent implements AfterViewInit {
  displayedColumns: string[] = ['auftragId', 'kennzeichen', 'marke', 'abgabeTermin', 'abgabeOrt', 'abgabeBestaetigt'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // Füge Platzhalter hinzu, um immer 10 Zeilen anzuzeigen
    const PLACEHOLDER_ROWS = 10;
    const filledData = [...this.dataSource.data];
    while (filledData.length < PLACEHOLDER_ROWS) {
      filledData.push(null); // Platzhalter hinzufügen
    }
    this.dataSource.data = filledData;

    // Paginator einstellen
    this.dataSource.paginator = this.paginator;
  }
}
