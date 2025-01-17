import { Component } from '@angular/core';
import { AuftragService } from '../../shared/services/auftrag.service';
import { Lkw } from '../../shared/models/lkw.model';
import { LkwService } from '../../shared/services/lkw.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-auftrag-erstellen',
  templateUrl: './auftrag-erstellen.component.html',
  styleUrls: ['./auftrag-erstellen.component.css'],
  standalone: false
})
export class AuftragErstellenComponent {
  auftrag = {
    kennzeichen: '',
    beschreibung: '',
    fahrtuechtig: null,
    standort: '',
    erstelltAm: new Date(),
    status: "Offen",
    vin: '',
    marke: '',
    modell: '',
    baujahr: 0,
    rolle: '',
    erstelltVon: '',
    email: ''
  };

  fahrzeug: Lkw | null = null;

  constructor(
    private auftragService: AuftragService,
    private lkwService: LkwService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loadUserDetails();
  }

  // Holt die Benutzerdaten aus dem JWT-Token
  private loadUserDetails(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.auftrag.rolle = decodedToken.department;
        this.auftrag.erstelltVon = `${decodedToken.firstName} ${decodedToken.lastName}`;
        this.auftrag.email = decodedToken.sub;
      } catch (error) {
        console.error('Fehler beim Dekodieren des Tokens:', error);
      }
    }
  }

  findVehicle() {
    if (this.auftrag.kennzeichen) {
      this.lkwService.getVehicleByKennzeichen(this.auftrag.kennzeichen).subscribe({
        next: (fahrzeug: Lkw) => {
          this.fahrzeug = fahrzeug;
        },
        error: () => {
          this.fahrzeug = null;
          console.log('Kein Fahrzeug gefunden!');
        }
      });
    }
  }

  isFormValid(): false | string {
    return !!this.fahrzeug &&
      this.auftrag.beschreibung &&
      this.auftrag.fahrtuechtig !== null &&
      this.auftrag.standort;
  }

  onSubmit() {
    if (this.fahrzeug) {
      this.auftrag = {
        ...this.auftrag,
        vin: this.fahrzeug.vin,
        marke: this.fahrzeug.marke,
        modell: this.fahrzeug.modell,
        baujahr: this.fahrzeug.baujahr,
        erstelltAm: new Date()
      };

      this.auftragService.createAuftrag(this.auftrag).subscribe({
        next: (response) => {
          console.log('Auftrag erfolgreich erstellt:', response);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Fehler beim Erstellen des Auftrags:', err);
          alert('Fehler beim Erstellen des Auftrags. Bitte erneut versuchen.');
        }
      });
    } else {
      alert('Kein Fahrzeug gefunden! Auftrag konnte nicht erstellt werden.');
    }
  }
}
