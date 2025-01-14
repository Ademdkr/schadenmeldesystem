import { Injectable } from '@angular/core';
import { Auftrag } from '../models/auftrag.model'; // Importiere das Modell

@Injectable({
  providedIn: 'root',
})
export class AuftraegeService {

  private offeneAuftraege = [
    {
      auftragId: 1,
      kennzeichen: 'ABC123',
      marke: 'Mercedes',
      fahrtuechtig: true,
      standort: 'Berlin',
      erstelltAm: '2025-01-01',
      beschreibung: 'Reparatur eines LKW',
      rolle: 'Mechaniker',
      erstelltVon: 'Max Mustermann',
      email: 'max@mustermann.de',
      status: 'Offen',
      abgabeOrt: 'Werkstatt',
      abgabeDatum: '2025-01-15',
    },
    {
      auftragId: 2,
      kennzeichen: 'DEF456',
      marke: 'Audi',
      fahrtuechtig: false,
      standort: 'Hamburg',
      erstelltAm: '2025-01-02',
      beschreibung: 'Reparatur der Bremsen',
      rolle: 'Werkstattleiter',
      erstelltVon: 'Erika Mustermann',
      email: 'erika@mustermann.de',
      status: 'In Bearbeitung',
      abgabeOrt: 'Lager',
      abgabeDatum: '2025-01-20',
    },
  ];


  // Methode um alle offenen Aufträge zurückzugeben
  getOffeneAuftraege() {
    return this.offeneAuftraege;
  }

  // Methode um einen spezifischen Auftrag nach der ID zu suchen
  getAuftragById(auftragId: number): Auftrag | undefined {
    return this.offeneAuftraege.find(auftrag => auftrag.auftragId === auftragId);
  }

  // Beispielhafte Fahrzeug-Daten für den Auftrag
  getFahrzeugByAuftragId(auftragId: number) {
    // Hier solltest du die Logik hinzufügen, um Fahrzeugdaten zu laden
    const fahrzeuge = [
      { auftragId: 1, vin: '1234567890', marke: 'Mercedes', modell: 'Actros', baujahr: 2018 },
      { auftragId: 2, vin: '9876543210', marke: 'Audi', modell: 'A4', baujahr: 2020 },
    ];
    return fahrzeuge.find(fahrzeug => fahrzeug.auftragId === auftragId);
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
}
