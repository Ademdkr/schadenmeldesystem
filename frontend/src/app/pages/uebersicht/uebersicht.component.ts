import {Component, OnInit, AfterViewInit, QueryList, ViewChildren} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AuftragService} from '../../shared/services/auftrag.service';
import {PaginationService} from '../../shared/utils/pagination.service';

@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.css'],
  standalone: false
})
export class UebersichtComponent implements OnInit, AfterViewInit {
  @ViewChildren(MatPaginator) paginators!: QueryList<MatPaginator>;

  tableConfig = [
    {
      key: 'offene',
      title: 'Offene Aufträge',
      displayedColumns: ['auftragId', 'kennzeichen', 'marke', 'fahrtuechtig', 'standort', 'erstelltAm'],
      dataSource: new MatTableDataSource<any>([]),
    },
    {
      key: 'terminierte',
      title: 'Terminierte Aufträge',
      displayedColumns: ['auftragId', 'kennzeichen', 'marke', 'abgabeDatum', 'abgabeOrt', 'abgabeBestaetigt'],
      dataSource: new MatTableDataSource<any>([]),
    },
    {
      key: 'inBearbeitung',
      title: 'In Bearbeitung Aufträge',
      displayedColumns: ['auftragId', 'kennzeichen', 'marke', 'bearbeiter', 'reparaturStart'],
      dataSource: new MatTableDataSource<any>([]),
    },
  ];

  constructor(
    private auftragService: AuftragService,
    private paginationService: PaginationService
  ) {
  }

  ngOnInit() {
    this.tableConfig.forEach((table) => this.loadData(table.key, this.getStatusForKey(table.key)));
  }

  ngAfterViewInit() {
    this.paginators.toArray().forEach((paginator, index) => {
      const table = this.tableConfig[index];
      this.initializePaginator(table.dataSource, paginator);
    });
  }

  private loadData(key: string, status: string) {
    const table = this.tableConfig.find((t) => t.key === key);
    if (table) {
      this.auftragService.getAuftraegeByStatus(status).subscribe(
        (data) => {
          const placeholdersNeeded = Math.max(0, 3 - data.length);
          const placeholderRows = Array(placeholdersNeeded).fill(this.createPlaceholder(key));
          table.dataSource.data = [...data, ...placeholderRows];
        },
        (error) => {
          console.error(`Fehler beim Laden der ${key}-Aufträge:`, error);
        }
      );
    }
  }

  private createPlaceholder(key: string): any {
    const placeholders: any = {
      auftragId: null,
      kennzeichen: null,
      marke: null,
    };

    if (key === 'terminierte') {
      placeholders.abgabeOrt = null;
      placeholders.abgabeBestaetigt = null;
    } else if (key === 'inBearbeitung') {
      placeholders.bearbeiter = null;
      placeholders.reparaturStart = null;
    }

    return placeholders;
  }

  private initializePaginator(dataSource: MatTableDataSource<any>, paginator: MatPaginator) {
    dataSource.paginator = paginator;
    this.paginationService.initializeTable(dataSource, paginator, 3);
  }

  private getStatusForKey(key: string): string {
    switch (key) {
      case 'offene':
        return 'offen';
      case 'terminierte':
        return 'terminiert';
      case 'inBearbeitung':
        return 'in-bearbeitung';
      default:
        return '';
    }
  }
}
