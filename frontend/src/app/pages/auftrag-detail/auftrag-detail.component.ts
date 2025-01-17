import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuftragService} from '../../shared/services/auftrag.service';

@Component({
  selector: 'app-auftrag-detail',
  templateUrl: './auftrag-detail.component.html',
  styleUrls: ['./auftrag-detail.component.css'],
  standalone: false,
})
export class AuftragDetailComponent implements OnInit {
  auftragId: number | null = null;
  auftrag: any = {};
  fahrzeug: any;
  abgabeBestaetigt: boolean = false; // Neue Property

  constructor(
    private route: ActivatedRoute,
    private auftragService: AuftragService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const auftragIdParam = params.get('auftragId');
      if (auftragIdParam) {
        this.auftragId = +auftragIdParam;
        this.loadAuftragDetails();
      }
    });
  }

  loadAuftragDetails(): void {
    if (this.auftragId !== null) {
      this.auftragService.getAuftragById2(this.auftragId).subscribe(
        (data) => {
          this.auftrag = data;
          if (data.erstelltAm) {
            const date = new Date(data.erstelltAm);
            data.erstelltAm = date.toLocaleString('de-DE', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false // 24-Stunden Format
            });
          }

          // Wenn das Abgabe Datum ein String ist, konvertiere es zu einem Date-Objekt
          if (data.abgabeDatum) {
            this.auftrag.abgabeDatum = new Date(data.abgabeDatum);
          }
          // Fahrzeugdaten direkt aus dem Auftrag laden
          this.fahrzeug = {
            vin: this.auftrag.vin,
            marke: this.auftrag.marke,
            modell: this.auftrag.modell,
            baujahr: this.auftrag.baujahr,
          };
        },
        (error) => {
          console.error('Fehler beim Laden des Auftrags:', error);
        }
      );
    }
  }


  terminieren(): void {
    if (!this.auftrag.abgabeOrt || !this.auftrag.abgabeDatum) {
      console.error('Abgabe Ort und Abgabe Datum müssen ausgefüllt sein.');
      return;
    }

    if (this.auftragId !== null) {
      const body = {
        status: 'Terminiert',
        abgabeOrt: this.auftrag.abgabeOrt,
        abgabeDatum: this.auftrag.abgabeDatum,
        abgabeBestaetigt: false // Setze abgabeBestaetigt auf false
      };

      this.auftragService.updateAuftragStatus(this.auftragId, body).subscribe(
        (response) => {
          console.log('Auftrag wurde terminiert:', response);
          this.auftrag.status = 'Terminiert'; // Lokale Aktualisierung des Status
          this.auftrag.abgabeBestaetigt = false; // Lokale Aktualisierung von abgabeBestaetigt
          // Weiterleitung zur Hauptseite
          this.router.navigate(['/']); // Passe den Pfad zur Hauptseite an
        },
        (error) => {
          console.error('Fehler beim Terminieren des Auftrags:', error);
        }
      );
    }
  }


  abgabeBestaetigen(event: any): void {
    if (event.checked && this.auftragId !== null) {
      const body = {abgabeBestaetigt: true};

      this.auftragService.updateAuftragAbgabeBestaetigt(this.auftragId, body).subscribe(
        (response) => {
          console.log('Abgabe wurde bestätigt:', response);
          this.auftrag.abgabeBestaetigt = true; // Lokale Aktualisierung
        },
        (error) => {
          console.error('Fehler bei der Abgabebestätigung:', error);
        }
      );
    }
  }

  startBearbeitung(): void {
    if (this.auftragId !== null) {
      const body = {
        status: 'In Bearbeitung',
        reparaturStart: new Date().toISOString() // Aktuelles Datum und Uhrzeit
      };

      this.auftragService.updateAuftragStatus(this.auftragId, body).subscribe(
        (response) => {
          console.log('Bearbeitung gestartet:', response);
          this.auftrag.status = 'In Bearbeitung';
          this.auftrag.reparaturStart = body.reparaturStart; // Lokale Aktualisierung
          // Weiterleitung zur Hauptseite
          this.router.navigate(['/']); // Passe den Pfad zur Hauptseite an
        },
        (error) => {
          console.error('Fehler beim Start der Bearbeitung:', error);
        }
      );
    }
  }

  endBearbeitung(): void {
    if (this.auftragId !== null) {
      const body = {
        status: 'Abgeschlossen',
        reparaturEnde: new Date().toISOString() // Aktuelles Datum und Uhrzeit
      };

      this.auftragService.updateAuftragStatus(this.auftragId, body).subscribe(
        (response) => {
          console.log('Bearbeitung gestartet:', response);
          this.auftrag.status = 'Abgeschlossen';
          this.auftrag.reparaturEnde = body.reparaturEnde; // Lokale Aktualisierung
          // Weiterleitung zur Hauptseite
          this.router.navigate(['/']); // Passe den Pfad zur Hauptseite an
        },
        (error) => {
          console.error('Fehler beim Start der Bearbeitung:', error);
        }
      );
    }
  }
}
