import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router, RouterLink } from '@angular/router';
import { AuftraegeService } from '../../shared/services/auftraege.service';

@Component({
  selector: 'app-terminierte-auftraege',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, RouterLink],
  templateUrl: './terminierte-auftraege.component.html',
  styleUrls: ['./terminierte-auftraege.component.css'],
})
export class TerminierteAuftraegeComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'auftragId',
    'kennzeichen',
    'marke',
    'abgabeTermin',
    'abgabeOrt',
    'abgabeBestaetigt'
  ];
  terminierteAuftraegeDataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) terminierteAuftraegePaginator!: MatPaginator;

  constructor(
    private auftraegeService: AuftraegeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTerminierteAuftraege();
  }

  ngAfterViewInit() {
    this.initializeTable(this.terminierteAuftraegeDataSource, this.terminierteAuftraegePaginator);
  }

  loadTerminierteAuftraege() {
    const terminierteAuftraege = this.auftraegeService.getTerminierteAuftraege();
    this.terminierteAuftraegeDataSource.data = terminierteAuftraege;
  }

  initializeTable(dataSource: MatTableDataSource<any>, paginator: MatPaginator) {
    const PLACEHOLDER_ROWS = 10;
    const filledData = [...dataSource.data];
    while (filledData.length < PLACEHOLDER_ROWS) {
      filledData.push({
        auftragId: null,
        kennzeichen: null,
        marke: null,
        abgabeTermin: null,
        abgabeOrt: null,
        abgabeBestaetigt: null,
      });
    }
    dataSource.data = filledData;
    dataSource.paginator = paginator;
  }
}
