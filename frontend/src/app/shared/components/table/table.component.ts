import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: false
})
export class TableComponent {
  /** Datenquelle für die Tabelle */
  @Input() dataSource!: MatTableDataSource<unknown>;

  /** Spalten, die angezeigt werden sollen */
  @Input() displayedColumns: string[] = [];

  /** Paginator, der von der Eltern-Komponente übergeben wird */
  @Input() paginator!: MatPaginator;

  /** Wenn sich Inputs ändern, verknüpfen wir dataSource und paginator */
  ngOnChanges(): void {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
