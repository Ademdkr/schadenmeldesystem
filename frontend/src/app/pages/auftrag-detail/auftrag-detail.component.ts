import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuftraegeService } from '../../shared/services/auftraege.service';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-auftrag-detail',
  templateUrl: './auftrag-detail.component.html',
  imports: [
    MatCard,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
  ],
  styleUrls: ['./auftrag-detail.component.css']
})
export class AuftragDetailComponent implements OnInit {
  auftragId: number | null = null;
  auftrag: any;
  fahrzeug: any;

  constructor(
    private route: ActivatedRoute,
    private auftraegeService: AuftraegeService
  ) {}

  ngOnInit(): void {
    // Hole die 'auftragId' aus den Routenparametern
    this.route.paramMap.subscribe((params) => {
      const auftragIdParam = params.get('auftragId');
      if (auftragIdParam) {
        this.auftragId = +auftragIdParam; // Konvertiere den Parameter in eine Zahl
        this.loadAuftragDetails();
      }
    });
  }

  loadAuftragDetails(): void {
    if (this.auftragId !== null) {
      // Hol die Auftragsdaten
      this.auftrag = this.auftraegeService.getAuftragById(this.auftragId);
      // Hol die Fahrzeugdaten
      this.fahrzeug = this.auftraegeService.getFahrzeugByAuftragId(this.auftragId);
    }
  }
}
