// frontend/src/app/shared/components/table/table.component.ts

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { DateFormatPipe } from '../../utils/date-format.pipe';

/**
 * Generische Table-Komponente zur Darstellung beliebiger Datentypen.
 * Verwendet einen Typparameter T, um MatTableDataSource<T> zu unterstützen.
 */
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    DateFormatPipe
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T> implements OnChanges {
  /** Datenquelle für die Tabelle mit generischem Typ T */
  @Input() dataSource!: MatTableDataSource<T>;

  /** Spalten, die angezeigt werden sollen */
  @Input() displayedColumns: string[] = [];

  /** Paginator, der von der Eltern-Komponente übergeben wird */
  @Input() paginator!: MatPaginator;

  /** Wenn sich Inputs ändern, verknüpfen wir dataSource und paginator */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
