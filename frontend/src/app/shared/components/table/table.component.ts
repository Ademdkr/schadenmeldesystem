import {Component, Input} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: false
})
export class TableComponent {
  @Input() dataSource!: MatTableDataSource<any, MatPaginator>;
  @Input() displayedColumns: string[] = [];

}
