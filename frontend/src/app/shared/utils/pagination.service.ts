import {Injectable} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';


@Injectable({
  providedIn: 'root',
})
export class PaginationService {

  constructor() {
  }

  initializeTable(
    dataSource: MatTableDataSource<any>,
    paginator: MatPaginator,
    placeholderRowCount: number = 10
  ): void {
    paginator.pageSize = placeholderRowCount;
    const filledData = [...dataSource.data];
    const placeholder = this.createPlaceholderRow(dataSource.data[0]);

    while (filledData.length < placeholderRowCount) {
      filledData.push(placeholder);
    }

    dataSource.data = filledData;
    dataSource.paginator = paginator;
  }

  private createPlaceholderRow(firstRow: any): any {
    const placeholderRow = {...firstRow};
    Object.keys(placeholderRow).forEach(key => {
      placeholderRow[key] = null;
    });
    return placeholderRow;
  }
}
