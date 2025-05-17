// frontend/src/app/shared/models/auftrag.model.ts

export interface Auftrag {
  auftragId?: number;               // Auftrag-ID (optional)
  kennzeichen: string;              // Kennzeichen
  beschreibung: string;             // Beschreibung
  fahrtuechtig: boolean | null;     // Fahrtüchtigkeit (kann auch null sein)
  standort: string;                 // Standort
  erstelltAm: string | Date;        // Erstellungsdatum (string oder Date)
  vin?: string;                     // Fahrzeug-VIN (optional)
  marke?: string;                   // Marke (optional)
  modell?: string;                  // Fahrzeugmodell (optional)
  baujahr?: number;                 // Baujahr des Fahrzeugs (optional)
  rolle?: string;                   // Rolle des Erstellers (optional)
  erstelltVon?: string;             // Name des Erstellers (optional)
  email?: string;                   // E-Mail des Erstellers (optional)
  status?: string;                  // Status des Auftrags (optional)
  abgabeOrt?: string;               // Abgabe-Ort (optional)
  abgabeDatum?: string | Date;      // Abgabe-Datum (optional)
  abgabeBestaetigt?: boolean;       // Abgabe bestätigt (optional)
  bearbeiter?: string;              // Bearbeiter (optional)
  bearbeiterEmail?: string;         // E-Mail des Bearbeiters (optional)
  reparaturStart?: string;          // Reparaturstart (optional)
  reparaturEnde?: string;           // Reparaturende (optional)
}
