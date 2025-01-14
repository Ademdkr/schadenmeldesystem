export interface Auftrag {
  id: number;          // Auftrag-ID
  kennzeichen: string;  // Kennzeichen
  beschreibung: string; // Beschreibung
  fahrttuechtig: boolean; // Fahrtüchtigkeit
  standort: string;     // Standort
  status: string;       // Status
  erstelltAm: string;   // Erstellungsdatum
  marke: string;        // Marke hinzugefügt
}
