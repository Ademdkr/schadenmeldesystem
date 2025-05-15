export interface Auftrag {
  auftragId: number;    // Auftrag-ID
  kennzeichen: string;  // Kennzeichen
  beschreibung: string; // Beschreibung
  fahrtuechtig: boolean; // Fahrtüchtigkeit
  standort: string;     // Standort
  erstelltAm: string;   // Erstellungsdatum
  vin?: string;         // Fahrzeug-VIN (optional)
  marke?: string;        // Marke
  modell?: string;      // Fahrzeugmodell (optional)
  baujahr?: number;     // Baujahr des Fahrzeugs (optional)
  rolle?: string;       // Rolle des Erstellers
  erstelltVon?: string; // Name des Erstellers
  email?: string;       // E-Mail des Erstellers
  status?: string;      // Status des Auftrags
  abgabeOrt?: string;   // Abgabe Ort
  abgabeDatum?: string | Date; // Abgabe Datum
  abgabeBestaetigt?: boolean;
  bearbeiter?: string;
  bearbeiterEmail?: string;
  reparaturStart?: string;
  reparaturEnde?: string;
}
