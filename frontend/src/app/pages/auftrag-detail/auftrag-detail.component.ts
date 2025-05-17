import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {jwtDecode} from 'jwt-decode';
import {AuftragService} from '../../shared/services/auftrag.service';
import {AuthService} from '../../shared/services/auth.service';
import {Auftrag} from '../../shared/models/auftrag.model';

interface DecodedToken {
  department: string;
  firstName: string;
  lastName: string;
  sub: string;
}

interface Fahrzeug {
  vin?: string;
  marke?: string;
  modell?: string;
  baujahr?: number;
}

@Component({
  selector: 'app-auftrag-detail',
  templateUrl: './auftrag-detail.component.html',
  styleUrls: ['./auftrag-detail.component.css'],
  standalone: false,
})
export class AuftragDetailComponent implements OnInit {
  auftragId: number | null = null;
  auftrag: Auftrag | null = null;
  fahrzeug: Fahrzeug | null = null;
  abgabeBestaetigt = false;
  userRole = '';
  bearbeiter = '';
  bearbeiterEmail = '';

  constructor(
    private route: ActivatedRoute,
    private auftragService: AuftragService,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('auftragId');
      if (id) {
        this.auftragId = +id;
        this.loadAuftragDetails();
      }
    });
    this.loadUserDetails();
  }

  loadAuftragDetails(): void {
    if (this.auftragId !== null) {
      this.auftragService
        .getAuftragById(this.auftragId)
        .subscribe(
          (data: Auftrag) => {
            this.auftrag = data;
            // Datum umwandeln
            if (data.abgabeDatum) {
              this.auftrag.abgabeDatum = new Date(data.abgabeDatum);
            }
            this.fahrzeug = {
              vin: data.vin,
              marke: data.marke,
              modell: data.modell,
              baujahr: data.baujahr,
            };
          },
          (error: HttpErrorResponse) => {
            console.error('Fehler beim Laden des Auftrags:', error);
          }
        );
    }
  }

  private loadUserDetails(): void {
    const token = this.authService.getToken();
    if (!token) return;

    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      this.userRole = decodedToken.department;
      this.bearbeiter = `${decodedToken.firstName} ${decodedToken.lastName}`;
      this.bearbeiterEmail = decodedToken.sub;
    } catch (error) {
      console.error('Ungültiges Token:', error);
      this.authService.logout();
    }
  }

  terminieren(): void {
    if (!this.auftrag?.abgabeOrt || !this.auftrag.abgabeDatum) {
      console.error('Abgabe Ort und Abgabe Datum müssen ausgefüllt sein.');
      return;
    }
    if (this.auftragId === null) return;

    const body = {
      status: 'Terminiert',
      abgabeOrt: this.auftrag.abgabeOrt,
      abgabeDatum: this.auftrag.abgabeDatum,
      abgabeBestaetigt: false,
    };

    this.auftragService
      .updateAuftrag(this.auftragId, body)
      .subscribe(
        (response: Auftrag) => {
          console.log('Auftrag terminiert:', response);
          this.auftrag = {...this.auftrag!, status: 'Terminiert', abgabeBestaetigt: false};
          this.router.navigate(['/']);
        },
        (error: HttpErrorResponse) => {
          console.error('Fehler beim Terminieren des Auftrags:', error);
        }
      );
  }

  abgabeBestaetigen(event: MatCheckboxChange): void {
    if (!event.checked || this.auftragId === null) return;

    this.auftragService
      .updateAuftrag(this.auftragId, {abgabeBestaetigt: true})
      .subscribe(
        (response: Auftrag) => {
          console.log('Abgabe bestätigt:', response);
          if (this.auftrag) this.auftrag.abgabeBestaetigt = true;
        },
        (error: HttpErrorResponse) => {
          console.error('Fehler bei der Abgabebestätigung:', error);
        }
      );
  }

  startBearbeitung(): void {
    if (this.auftragId === null) return;

    const reparaturStart = new Date().toISOString();
    const body = {
      status: 'In Bearbeitung',
      reparaturStart,
      bearbeiter: this.bearbeiter,
      bearbeiterEmail: this.bearbeiterEmail,
    };

    this.auftragService
      .updateAuftrag(this.auftragId, body)
      .subscribe(
        (response: Auftrag) => {
          console.log('Bearbeitung gestartet:', response);
          if (this.auftrag) {
            Object.assign(this.auftrag, {
              status: 'In Bearbeitung',
              reparaturStart,
              bearbeiter: this.bearbeiter,
              bearbeiterEmail: this.bearbeiterEmail,
            });
          }
          this.router.navigate(['/']);
        },
        (error: HttpErrorResponse) => {
          console.error('Fehler beim Start der Bearbeitung:', error);
        }
      );
  }

  endBearbeitung(): void {
    if (this.auftragId === null) return;

    const reparaturEnde = new Date().toISOString();
    this.auftragService
      .updateAuftrag(this.auftragId, {status: 'Abgeschlossen', reparaturEnde})
      .subscribe(
        (response: Auftrag) => {
          console.log('Bearbeitung abgeschlossen:', response);
          if (this.auftrag) {
            this.auftrag.status = 'Abgeschlossen';
            this.auftrag.reparaturEnde = reparaturEnde;
          }
          this.router.navigate(['/']);
        },
        (error: HttpErrorResponse) => {
          console.error('Fehler beim Abschluss der Bearbeitung:', error);
        }
      );
  }
}
