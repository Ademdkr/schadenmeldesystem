import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MaterialModule} from '../../shared/modules/material.module';
import {AuftraegeService} from '../../shared/services/auftraege.service';

@Component({
  selector: 'app-auftrag-detail',
  templateUrl: './auftrag-detail.component.html',
  styleUrls: ['./auftrag-detail.component.css'],
  imports: [
    FormsModule,
    NgIf,
    MaterialModule
  ],
})
export class AuftragDetailComponent implements OnInit {
  auftragId: number | null = null;
  auftrag: any = {};
  fahrzeug: any;
  abgabeBestaetigt: boolean = false; // Neue Property

  constructor(
    private route: ActivatedRoute,
    private auftraegeService: AuftraegeService
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
      // Suche zuerst in offenen Aufträgen
      this.auftrag = this.auftraegeService.getOffeneAuftraege()
          .find((auftrag) => auftrag.auftragId === this.auftragId)
        ||
        // Wenn nicht gefunden, suche in terminierten Aufträgen
        this.auftraegeService.getTerminierteAuftraege()
          .find((auftrag) => auftrag.auftragId === this.auftragId)
        ||
        // Wenn nicht gefunden, suche in weiteren Kategorien
        this.auftraegeService.getInBearbeitungAuftraege()
          .find((auftrag) => auftrag.auftragId === this.auftragId)
        ||
        this.auftraegeService.getAbgeschlosseneAuftraege()
          .find((auftrag) => auftrag.auftragId === this.auftragId)
        ||
        {}; // Fallback auf leeres Objekt

      // Fahrzeugdaten laden, falls vorhanden
      this.fahrzeug = this.auftraegeService.getFahrzeugByAuftragId(this.auftragId);
    }
  }

  terminieren(): void {
    console.log('Auftrag wurde terminiert:', this.auftrag);
    // Status ändern, weitere Logik hinzufügen
  }

  startBearbeitung(): void {
    console.log('Bearbeitung gestartet:', this.auftrag);
    // Status ändern, weitere Logik hinzufügen
  }

  endBearbeitung(): void {
    console.log('Bearbeitung beendet:', this.auftrag);
    // Status ändern, weitere Logik hinzufügen
  }
}
