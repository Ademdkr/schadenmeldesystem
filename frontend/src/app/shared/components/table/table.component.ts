import {Component, Input} from '@angular/core';
import {MaterialModule} from '../../modules/material.module';
import {RouterLink} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [MaterialModule, RouterLink]
})
export class TableComponent {
  @Input() dataSource!: MatTableDataSource<any, MatPaginator>;
  @Input() displayedColumns: string[] = [];

}
