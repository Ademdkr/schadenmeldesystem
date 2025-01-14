import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auftrag } from '../models/auftrag.model'; // Importiere das Modell

@Injectable({
  providedIn: 'root',
})
export class AuftraegeService {
  /*private auftraege = new BehaviorSubject<Auftrag[]>([
    {
      id: 1,
      kennzeichen: 'ABC123',
      beschreibung: 'Reifenwechsel erforderlich',
      fahrttuechtig: false,  // Fahrtüchtigkeit
      standort: 'Werkstatt',
      status: 'Offen',
      erstelltAm: '2025-01-15', // Erstellungsdatum
      marke: 'Mercedes',       // Marke
    },
    {
      id: 2,
      kennzeichen: 'XYZ987',
      beschreibung: 'Ölwechsel notwendig',
      fahrttuechtig: true,    // Fahrtüchtigkeit
      standort: 'Lager',
      status: 'Offen',
      erstelltAm: '2025-01-10', // Erstellungsdatum
      marke: 'BMW',           // Marke
    },
  ]);*/

  getOffeneAuftraege() {
    // Beispiel-Daten, ersetze dies mit der echten Logik, um die Daten zu holen
    return [
      {
        auftragId: 1,
        kennzeichen: 'ABC123',
        marke: 'Mercedes',
        fahrtuechtig: true,
        standort: 'Berlin',
        erstelltAm: '2025-01-01',
      },
      {
        auftragId: 2,
        kennzeichen: 'DEF456',
        marke: 'Audi',
        fahrtuechtig: false,
        standort: 'Hamburg',
        erstelltAm: '2025-01-02',
      },
    ];
  }

  getTerminierteAuftraege() {
    return [
      {
        auftragId: 3,
        kennzeichen: 'GHI789',
        marke: 'MAN',
        abgabeTermin: '2024-02-02',
        abgabeOrt: 'Lager',
        abgabeBestaetigt: false
      }
    ]
  }

  getInBearbeitungAuftraege() {
    return [
      {
        auftragId: 4,
        kennzeichen: 'JKL123',
        marke: 'MAN',
        bearbeiter: 'Adem Dokur',
        reparaturStart: '2024-02-02'
      }
    ]
  }

  getAbgeschlosseneAuftraege() {
    return [
      {
        auftragId: 4,
        kennzeichen: 'JKL123',
        marke: 'MAN',
        bearbeiter: 'Adem Dokur',
        reparaturStart: '2024-02-24',
        reparaturEnde: '2024-02-25'
      }
    ]
  }

  // auftraege$ = this.auftraege.asObservable();
  //
  // addAuftrag(auftrag: Auftrag) {
  //   const currentData = this.auftraege.value;
  //   this.auftraege.next([...currentData, auftrag]);
  // }
  //
  // // Methode, die 10 Einträge sicherstellt
  // getAuftraegeWithPlaceholders(): Auftrag[] {
  //   const PLACEHOLDER_ROWS = 10;
  //   const filledData = [...this.auftraege.value];
  //
  //   // Füge Platzhalter hinzu, falls weniger als 10 Aufträge existieren
  //   while (filledData.length < PLACEHOLDER_ROWS) {
  //     filledData.push({
  //       id: 0,
  //       kennzeichen: '',
  //       beschreibung: '',
  //       fahrttuechtig: false,
  //       standort: '',
  //       status: '',
  //       erstelltAm: '', // Leeres Datum für Platzhalter
  //       marke: '',      // Leere Marke für Platzhalter
  //     });
  //   }
  //   return filledData;
  // }
}
