import {Component} from '@angular/core';
import {AuftragService} from '../../shared/services/auftrag.service';
import {Lkw} from '../../shared/models/lkw.model';
import {LkwService} from '../../shared/services/lkw.service';
import {Router} from '@angular/router'; // Importiere den Service

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
    vin: '',      // Fahrzeugdaten hinzufügen
    marke: '',
    modell: '',
    baujahr: 0,
  };

  fahrzeug: Lkw | null = null;

  constructor(
    private auftragService: AuftragService,
    private lkwService: LkwService,
    private router: Router) {
  }

  // Fahrzeug anhand des Kennzeichens suchen
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
        erstelltAm: new Date()// YYYY-MM-DD
      };
      this.auftragService.createAuftrag(this.auftrag).subscribe({
        next: (response) => {
          console.log('Auftrag erfolgreich erstellt:', response);
          // Weiterleitung zur Hauptseite
          this.router.navigate(['/']); // Passe den Pfad zur Hauptseite an
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
