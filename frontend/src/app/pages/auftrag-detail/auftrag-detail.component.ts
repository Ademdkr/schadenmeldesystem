import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NgIf } from '@angular/common';
import {AuftraegeService} from '../../shared/services/auftraege.service';

@Component({
  selector: 'app-auftrag-detail',
  templateUrl: './auftrag-detail.component.html',
  styleUrls: ['./auftrag-detail.component.css'],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule, // Native Date Adapter hinzufügen
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    NgIf,
  ],
})
export class AuftragDetailComponent implements OnInit {
  auftragId: number | null = null;
  auftrag: any = {}; // Initialisiere die Werte
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
      this.auftrag = this.auftraegeService.getAuftragById(this.auftragId) || {};
      // Hol die Fahrzeugdaten
      this.fahrzeug = this.auftraegeService.getFahrzeugByAuftragId(this.auftragId);
    }
  }

  terminieren(): void {
    console.log('Auftrag wurde terminiert:', this.auftrag);
    // Weitere Logik für das Terminieren kann hier ergänzt werden
  }
}
