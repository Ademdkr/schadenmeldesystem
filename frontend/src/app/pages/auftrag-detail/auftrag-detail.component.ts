import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuftraegeService} from '../../shared/services/auftraege.service';

@Component({
  selector: 'app-auftrag-detail',
  templateUrl: './auftrag-detail.component.html',
  styleUrls: ['./auftrag-detail.component.css'],
  standalone: false
})
export class AuftragDetailComponent implements OnInit {
  auftragId: number | null = null;
  auftrag: any = {};
  fahrzeug: any;
  abgabeBestaetigt: boolean = false; // Neue Property

  constructor(
    private route: ActivatedRoute,
    private auftraegeService: AuftraegeService,
    private router: Router // Router hinzufügen
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
      this.auftraegeService.getAuftragById2(this.auftragId).subscribe(
        (data) => {
          this.auftrag = data;
          // Lade das zugehörige Fahrzeug
          this.fahrzeug = data.fahrzeug || null;
        },
        (error) => {
          console.error('Fehler beim Laden des Auftrags:', error);
        }
      );
    }
  }

  terminieren(): void {
    if (this.auftragId !== null) {
      const body = {
        status: 'Terminiert',
        abgabeOrt: this.auftrag.abgabeOrt,
        abgabeDatum: this.auftrag.abgabeDatum
      };

      this.auftraegeService.updateAuftragStatus(this.auftragId, body).subscribe(
        (response) => {
          console.log('Auftrag wurde terminiert:', response);
          this.auftrag.status = 'Terminiert'; // Lokale Aktualisierung des Status
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

      this.auftraegeService.updateAuftragAbgabeBestaetigt(this.auftragId, body).subscribe(
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

      this.auftraegeService.updateAuftragStatus(this.auftragId, body).subscribe(
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

      this.auftraegeService.updateAuftragStatus(this.auftragId, body).subscribe(
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
