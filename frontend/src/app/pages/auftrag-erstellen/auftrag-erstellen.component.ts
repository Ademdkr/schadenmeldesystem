import { Component } from '@angular/core';
import { AuftragService } from '../../shared/services/auftrag.service'; // Importiere den Service

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
    erstelltAm: ''
  };

  fahrzeuge = [
    { kennzeichen: 'ABC123', vin: '1HGBH41JXMN109186', marke: 'BMW', modell: '320i', baujahr: 2018 },
    { kennzeichen: 'DEF456', vin: '2HGBH41JXMN109187', marke: 'Audi', modell: 'A3', baujahr: 2020 },
    { kennzeichen: 'GHI789', vin: '3HGBH41JXMN109188', marke: 'Mercedes', modell: 'C-Class', baujahr: 2019 }
  ];

  fahrzeug: {
    kennzeichen: string;
    vin: string;
    marke: string;
    modell: string;
    baujahr: number;
  } | null = null;

  constructor(private auftragService: AuftragService) {} // Service injizieren

  findVehicle() {
    this.fahrzeug = this.fahrzeuge.find(vehicle => vehicle.kennzeichen === this.auftrag.kennzeichen) || null;
  }

  onSubmit() {
    if (this.fahrzeug) {
      this.auftrag['erstelltAm'] = new Date().toISOString().split('T')[0]; // YYYY-MM-DD Format
      this.auftragService.createAuftrag(this.auftrag).subscribe({
        next: (response) => {
          console.log('Auftrag erfolgreich erstellt:', response);
          alert('Auftrag wurde erfolgreich erstellt!');
        },
        error: (err) => {
          console.error('Fehler beim Erstellen des Auftrags:', err);
          alert('Fehler beim Erstellen des Auftrags. Bitte erneut versuchen.');
        }
      });
    } else {
      console.log('Kein Fahrzeug gefunden!');
      alert('Kein Fahrzeug gefunden! Auftrag konnte nicht erstellt werden.');
    }
  }

}
