import { Component, OnInit, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuftragService } from '../../shared/services/auftrag.service';
import { PaginationService } from '../../shared/utils/pagination.service';
import { AuthService } from '../../shared/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { Auftrag } from '../../shared/models/auftrag.model';

interface DecodedToken {
  sub: string;
  department: string;
}

// Wir verwenden Partial<Auftrag> für Platzhalter-Zeilen, da dort Felder fehlen dürfen
type AuftragRow = Auftrag | Partial<Auftrag>;

@Component({
  selector: 'app-auftrag-tabelle',
  templateUrl: './auftrag-tabelle.component.html',
  styleUrls: ['./auftrag-tabelle.component.css'],
  standalone: false,
})
export class AuftragTabelleComponent implements OnInit, AfterViewInit {
  @ViewChildren(MatPaginator) paginators!: QueryList<MatPaginator>;

  userRole = '';
  userEmail = '';

  // Jetzt typisiert: DataSource für Auftrag oder Partial<Auftrag>
  tableConfig: {
    key: string;
    title: string;
    displayedColumns: string[];
    dataSource: MatTableDataSource<AuftragRow>;
  }[] = [
    {
      key: 'offene',
      title: 'Offene Aufträge',
      displayedColumns: ['auftragId', 'kennzeichen', 'marke', 'fahrtuechtig', 'standort', 'erstelltAm'],
      dataSource: new MatTableDataSource<AuftragRow>([]),
    },
    {
      key: 'terminierte',
      title: 'Terminierte Aufträge',
      displayedColumns: ['auftragId', 'kennzeichen', 'marke', 'abgabeDatum', 'abgabeOrt', 'abgabeBestaetigt'],
      dataSource: new MatTableDataSource<AuftragRow>([]),
    },
    {
      key: 'inBearbeitung',
      title: 'In Bearbeitung Aufträge',
      displayedColumns: ['auftragId', 'kennzeichen', 'marke', 'bearbeiter', 'reparaturStart'],
      dataSource: new MatTableDataSource<AuftragRow>([]),
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
    if (!token) { return; }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      this.userEmail = decoded.sub;
      this.userRole  = decoded.department;

      // erst jetzt Daten laden
      this.tableConfig.forEach(table =>
        this.loadData(table.key, this.getStatusForKey(table.key))
      );
    } catch (e) {
      console.error('Fehler beim Dekodieren des Tokens:', e);
    }
  }

  private loadData(key: string, status: string): void {
    const table = this.tableConfig.find(t => t.key === key);
    if (!table) { return; }

    this.auftragService.getAuftraegeByStatus(status).subscribe(
      (data: Auftrag[]) => {
        let rows: AuftragRow[] = data;
        if (this.userRole === 'Fahrer') {
          rows = rows.filter(a => a.email === this.userEmail);
        }
        // mind. 3 Zeilen
        const placeholders: AuftragRow[] = Array(Math.max(0, 3 - rows.length))
          .fill(this.createPlaceholder(key));
        table.dataSource.data = [...rows, ...placeholders];
      },
      err => {
        console.error(`Fehler beim Laden der ${key}-Aufträge:`, err);
      }
    );
  }

  private createPlaceholder(key: string): Partial<Auftrag> {
    const base: Partial<Auftrag> = {
      auftragId: undefined,
      kennzeichen: '',
      marke: '',
    };

    if (key === 'terminierte') {
      return { ...base, abgabeOrt: '', abgabeBestaetigt: false };
    } else if (key === 'inBearbeitung') {
      return { ...base, bearbeiter: '', reparaturStart: '' };
    }
    return base;
  }

  private initializePaginator(dataSource: MatTableDataSource<AuftragRow>, paginator: MatPaginator): void {
    dataSource.paginator = paginator;
    this.paginationService.initializeTable(dataSource, paginator, 3);
  }

  private getStatusForKey(key: string): string {
    switch (key) {
      case 'offene': return 'offen';
      case 'terminierte': return 'terminiert';
      case 'inBearbeitung': return 'in-bearbeitung';
      default: return '';
    }
  }
}
