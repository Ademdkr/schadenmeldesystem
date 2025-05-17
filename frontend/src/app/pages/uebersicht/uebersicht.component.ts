// frontend/src/app/pages/uebersicht/uebersicht.component.ts

import { Component, OnInit, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuftragService } from '../../shared/services/auftrag.service';
import { PaginationService } from '../../shared/utils/pagination.service';
import { AuthService } from '../../shared/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { Auftrag } from '../../shared/models/auftrag.model';
import { TableComponent } from '../../shared/components/table/table.component';

interface DecodedToken {
  sub: string;
  department: string;
}

type AuftragRow = Auftrag | Partial<Auftrag>;

@Component({
  selector: 'app-uebersicht',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    TableComponent
  ],
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.css'],
})
export class UebersichtComponent implements OnInit, AfterViewInit {
  @ViewChildren(MatPaginator) paginators!: QueryList<MatPaginator>;

  userRole = '';
  userEmail = '';

  tableConfig = [
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
    this.paginators.toArray().forEach((paginator, i) => {
      this.paginationService.initializeTable(
        this.tableConfig[i].dataSource,
        paginator,
        3
      );
    });
  }

  private loadUserDetails(): void {
    const token = this.authService.getToken();
    if (!token) return;
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      this.userEmail = decoded.sub;
      this.userRole = decoded.department;
      this.tableConfig.forEach(tbl =>
        this.loadData(tbl.key, this.getStatusForKey(tbl.key))
      );
    } catch (e) {
      console.error(e);
    }
  }

  private loadData(key: string, status: string): void {
    const table = this.tableConfig.find(t => t.key === key);
    if (!table) return;
    this.auftragService.getAuftraegeByStatus(status).subscribe(data => {
      let rows: AuftragRow[] = data;
      if (this.userRole === 'Fahrer') {
        rows = rows.filter(a => a.email === this.userEmail);
      }
      const placeholders: AuftragRow[] = Array(Math.max(0, 3 - rows.length))
        .fill(this.createPlaceholder(key));
      table.dataSource.data = [...rows, ...placeholders];
    });
  }

  private createPlaceholder(key: string): Partial<Auftrag> {
    const base: Partial<Auftrag> = { auftragId: undefined, kennzeichen: '', marke: '' };
    if (key === 'terminierte') return { ...base, abgabeOrt: '', abgabeBestaetigt: false };
    if (key === 'inBearbeitung') return { ...base, bearbeiter: '', reparaturStart: '' };
    return base;
  }

  private getStatusForKey(key: string): string {
    return key === 'offene' ? 'offen'
      : key === 'terminierte' ? 'terminiert'
        : key === 'inBearbeitung' ? 'in-bearbeitung'
          : '';
  }
}
