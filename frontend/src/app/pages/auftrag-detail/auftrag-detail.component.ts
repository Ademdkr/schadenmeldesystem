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
      const alleAuftraege = [
        ...this.auftraegeService.getOffeneAuftraege(),
        ...this.auftraegeService.getTerminierteAuftraege(),
        ...this.auftraegeService.getInBearbeitungAuftraege(),
        ...this.auftraegeService.getAbgeschlosseneAuftraege(),
      ];

      this.auftrag = alleAuftraege.find((auftrag) => auftrag.auftragId === this.auftragId) || {};
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
