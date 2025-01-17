import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../shared/modules/material.module';


@Component({
  selector: 'app-auftrag-erstellen',
  templateUrl: './auftrag-erstellen.component.html',
  styleUrls: ['./auftrag-erstellen.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MaterialModule
  ]
})
export class AuftragErstellenComponent {
  auftrag = {
    kennzeichen: '',
    beschreibung: '',
    fahrttuechtig: null,
    standort: ''
  };

  // Simulierte Fahrzeugdaten
  fahrzeuge = [
    {kennzeichen: 'ABC123', vin: '1HGBH41JXMN109186', marke: 'BMW', modell: '320i', baujahr: 2018},
    {kennzeichen: 'DEF456', vin: '2HGBH41JXMN109187', marke: 'Audi', modell: 'A3', baujahr: 2020},
    {kennzeichen: 'GHI789', vin: '3HGBH41JXMN109188', marke: 'Mercedes', modell: 'C-Class', baujahr: 2019}
  ];

  fahrzeug: {
    kennzeichen: string;
    vin: string;
    marke: string;
    modell: string;
    baujahr: number;
  } | null = null; // Das Fahrzeug, das dem Kennzeichen entspricht

  // Methode, um das Fahrzeug anhand des Kennzeichens zu suchen
  findVehicle() {
    this.fahrzeug = this.fahrzeuge.find(vehicle => vehicle.kennzeichen === this.auftrag.kennzeichen) || null;
  }

  // Methode zum Absenden des Formulars (Platzhalter)
  onSubmit() {
    if (this.fahrzeug) {
      console.log('Reparaturauftrag erstellt:', this.auftrag);
      // Hier könnte der Code zum Erstellen des Auftrags an das Backend hinzugefügt werden
    } else {
      console.log('Kein Fahrzeug gefunden!');
    }
  }
}
