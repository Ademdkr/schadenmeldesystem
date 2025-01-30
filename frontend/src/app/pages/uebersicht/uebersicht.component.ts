import { Component, OnInit, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuftragService } from '../../shared/services/auftrag.service';
import { PaginationService } from '../../shared/utils/pagination.service';
import { AuthService } from '../../shared/services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.css'],
  standalone: false
})
export class UebersichtComponent implements OnInit, AfterViewInit {
  @ViewChildren(MatPaginator) paginators!: QueryList<MatPaginator>;
  userRole: string = '';
  userEmail: string = '';

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
    private paginationService: PaginationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUserDetails();
  }

  ngAfterViewInit() {
    this.paginators.toArray().forEach((paginator, index) => {
      const table = this.tableConfig[index];
      this.initializePaginator(table.dataSource, paginator);
    });
  }

  private loadUserDetails(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userEmail = decodedToken.sub; // E-Mail-Adresse aus dem Token holen
        this.userRole = decodedToken.department;

        // Daten erst nach Laden der Benutzerinformationen abrufen
        this.tableConfig.forEach((table) => this.loadData(table.key, this.getStatusForKey(table.key)));
      } catch (error) {
        console.error('Fehler beim Dekodieren des Tokens:', error);
      }
    }
  }

  private loadData(key: string, status: string) {
    const table = this.tableConfig.find((t) => t.key === key);
    if (table) {
      this.auftragService.getAuftraegeByStatus(status).subscribe(
        (data) => {
          if (this.userRole === 'Fahrer') {
            data = data.filter((auftrag) => auftrag.email === this.userEmail);
          }
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
