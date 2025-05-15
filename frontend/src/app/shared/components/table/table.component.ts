// frontend/src/app/shared/components/table/table.component.ts

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  standalone: true,            // jetzt standalone
  imports: [
    CommonModule,              // für *ngFor, etc.
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {
  /** Datenquelle für die Tabelle */
  @Input() dataSource!: MatTableDataSource<unknown>;

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
