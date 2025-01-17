import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuftragService } from '../../shared/services/auftrag.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Auftrag } from '../../shared/models/auftrag.model';
import { PaginationService } from '../../shared/utils/pagination.service';
import { AuthService } from '../../shared/services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-auftrag-tabelle',
  templateUrl: './auftrag-tabelle.component.html',
  styleUrls: ['./auftrag-tabelle.component.css'],
  standalone: false,
})
export class AuftragTabelleComponent implements OnInit {
  status!: string;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Auftrag>([]);
  userRole: string = '';
  userEmail: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private auftragService: AuftragService,
    private paginationService: PaginationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUserDetails();
    this.route.params.subscribe((params) => {
      this.status = params['status'];
      this.setDisplayedColumns();
      this.loadAuftraege();
    });
  }

  private loadUserDetails(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userEmail = decodedToken.sub; // E-Mail-Adresse aus dem Token holen
        this.userRole = decodedToken.department;
      } catch (error) {
        console.error('Fehler beim Dekodieren des Tokens:', error);
      }
    }
  }

  setDisplayedColumns() {
    const columnsMap: Record<string, string[]> = {
      offen: ['auftragId', 'kennzeichen', 'marke', 'fahrtuechtig', 'standort', 'erstelltAm'],
      terminiert: ['auftragId', 'kennzeichen', 'marke', 'abgabeDatum', 'abgabeOrt', 'abgabeBestaetigt'],
      'in-bearbeitung': ['auftragId', 'kennzeichen', 'marke', 'bearbeiter', 'reparaturStart'],
      abgeschlossen: ['auftragId', 'kennzeichen', 'marke', 'bearbeiter', 'reparaturStart', 'reparaturEnde'],
    };
    this.displayedColumns = columnsMap[this.status] || [];
  }

  loadAuftraege() {
    this.auftragService.getAuftraegeByStatus(this.status).subscribe(
      (data) => {
        // Falls der Benutzer ein Fahrer ist, filtere nur die eigenen Aufträge nach E-Mail
        if (this.userRole === 'Fahrer') {
          this.dataSource.data = data.filter((auftrag) => auftrag.email === this.userEmail);
        } else {
          this.dataSource.data = data;
        }
        this.paginationService.initializeTable(this.dataSource, this.paginator, 10);
      },
      (error) => {
        console.error(`Fehler beim Laden der Aufträge (${this.status})`, error);
      }
    );
  }
}
