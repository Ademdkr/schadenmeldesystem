export interface Auftrag {
  auftragId: number;    // Auftrag-ID
  kennzeichen: string;  // Kennzeichen
  beschreibung: string; // Beschreibung
  fahrtuechtig: boolean; // Fahrtüchtigkeit
  standort: string;     // Standort
  erstelltAm: string;   // Erstellungsdatum
  marke: string;        // Marke
  vin?: string;         // Fahrzeug-VIN (optional)
  modell?: string;      // Fahrzeugmodell (optional)
  baujahr?: number;     // Baujahr des Fahrzeugs (optional)
}
