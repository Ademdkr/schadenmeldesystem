import {Injectable} from '@angular/core';
import {Auftrag} from '../models/auftrag.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs'; // Importiere das Modell

@Injectable({
  providedIn: 'root',
})
export class AuftraegeService {

  private baseUrl = 'http://localhost:8080/api/auftraege'; // Backend-URL
  constructor(private http: HttpClient) {
  }

  private auftraege: Auftrag[] = [
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
      status: 'Offen',
    },
    {
      auftragId: 3,
      kennzeichen: 'GHI789',
      marke: 'MAN',
      fahrtuechtig: true,
      standort: 'Berlin',
      erstelltAm: '2025-01-02',
      beschreibung: 'Reparatur der Bremsen',
      rolle: 'Werkstattleiter',
      erstelltVon: 'Erika Mustermann',
      email: 'erika@mustermann.de',
      status: 'Terminiert',
      abgabeDatum: '2025-01-20',
      abgabeTermin: '2024-02-02',
      abgabeOrt: 'Lager',
      abgabeBestaetigt: false,
    },
    {
      auftragId: 4,
      kennzeichen: 'GHI789',
      marke: 'MAN',
      fahrtuechtig: true,
      standort: 'Berlin',
      erstelltAm: '2025-01-02',
      beschreibung: 'Reparatur der Bremsen',
      rolle: 'Werkstattleiter',
      erstelltVon: 'Erika Mustermann',
      email: 'erika@mustermann.de',
      status: 'In Bearbeitung',
      abgabeDatum: '2025-01-20',
      abgabeTermin: '2024-02-02',
      abgabeOrt: 'Lager',
      abgabeBestaetigt: true,
      bearbeiter: 'Don Jon',
      bearbeiterEmail: 'erika@mustermann.de',
      reparaturStart: '2024-02-02',
    },
    {
      auftragId: 5,
      kennzeichen: 'GHI789',
      marke: 'MAN',
      fahrtuechtig: true,
      standort: 'Berlin',
      erstelltAm: '2025-01-02',
      beschreibung: 'Reparatur der Bremsen',
      rolle: 'Werkstattleiter',
      erstelltVon: 'Erika Mustermann',
      email: 'erika@mustermann.de',
      status: 'Abgeschlossen',
      abgabeDatum: '2025-01-20',
      abgabeTermin: '2024-02-02',
      abgabeOrt: 'Lager',
      abgabeBestaetigt: true,
      bearbeiter: 'Don Jon',
      bearbeiterEmail: 'erika@mustermann.de',
      reparaturStart: '2024-02-02',
      reparaturEnde: '2024-02-25',
    },
  ];

  // Methode, um Aufträge nach Status zu filtern
  getAuftraegeByStatus(status: string): Auftrag[] {
    return this.auftraege.filter(auftrag => auftrag.status === status);
  }

  // Methode, um alle offenen Aufträge zu holen
  getOffeneAuftraege(): Auftrag[] {
    return this.getAuftraegeByStatus('Offen');
  }

  getOffeneAuftraege2(): Observable<Auftrag[]> {
    return this.http.get<Auftrag[]>(`${this.baseUrl}/offen`);
  }

  // Methode, um alle terminierten Aufträge zu holen
  getTerminierteAuftraege(): Auftrag[] {
    return this.getAuftraegeByStatus('Terminiert');
  }

  getTerminierteAuftraege2(): Observable<Auftrag[]> {
    return this.http.get<Auftrag[]>(`${this.baseUrl}/terminiert`);
  }

  // Methode, um alle in Bearbeitung befindlichen Aufträge zu holen
  getInBearbeitungAuftraege(): Auftrag[] {
    return this.getAuftraegeByStatus('In Bearbeitung');
  }

  getInBearbeitungAuftraege2(): Observable<Auftrag[]> {
    return this.http.get<Auftrag[]>(`${this.baseUrl}/in-bearbeitung`);
  }

  // Methode, um alle abgeschlossenen Aufträge zu holen
  getAbgeschlosseneAuftraege(): Auftrag[] {
    return this.getAuftraegeByStatus('Abgeschlossen');
  }

  getAbgeschlosseneAuftraege2(): Observable<Auftrag[]> {
    return this.http.get<Auftrag[]>(`${this.baseUrl}/abgeschlossen`);
  }


  // Methode, um einen spezifischen Auftrag nach ID zu finden
  getAuftragById(auftragId: number): Auftrag | undefined {
    return this.auftraege.find(auftrag => auftrag.auftragId === auftragId);
  }

  // Beispielhafte Fahrzeug-Daten für den Auftrag
  getFahrzeugByAuftragId(auftragId: number) {
    const fahrzeuge = [
      {auftragId: 1, vin: '1234567890', marke: 'Mercedes', modell: 'Actros', baujahr: 2018},
      {auftragId: 2, vin: '9876543210', marke: 'Audi', modell: 'A4', baujahr: 2020},
      {auftragId: 3, vin: '9876543210', marke: 'Audi', modell: 'A4', baujahr: 2020},
      {auftragId: 4, vin: '9876543210', marke: 'Audi', modell: 'A4', baujahr: 2020},
      {auftragId: 5, vin: '9876543210', marke: 'Audi', modell: 'A4', baujahr: 2020},
    ];
    return fahrzeuge.find(fahrzeug => fahrzeug.auftragId === auftragId);
  }
}
