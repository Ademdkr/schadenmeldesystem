import {AfterViewInit, Component, ViewChild, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AuftragService} from '../../shared/services/auftrag.service'; // Füge den Import des Services hinzu

@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.css'],
  standalone: false,
})
export class UebersichtComponent implements OnInit, AfterViewInit {
  offeneAuftraegeDisplayedColumns: string[] = ['auftragId', 'kennzeichen', 'marke', 'fahrtuechtig', 'standort', 'erstelltAm'];
  terminierteAuftraegeDisplayedColumns: string[] = ['auftragId', 'kennzeichen', 'marke', 'abgabeTermin', 'abgabeOrt', 'abgabeBestaetigt'];
  inBearbeitungAuftraegeDisplayedColumns: string[] = ['auftragId', 'kennzeichen', 'marke', 'bearbeiter', 'reparaturStart'];

  offeneAuftraegeDataSource = new MatTableDataSource<any>([]);
  terminierteAuftraegeDataSource = new MatTableDataSource<any>([]);
  inBearbeitungAuftraegeDataSource = new MatTableDataSource<any>([]);

  @ViewChildren(MatPaginator) paginators!: QueryList<MatPaginator>;

  constructor(private auftragService: AuftragService) {
  }

  ngOnInit() {
    // Lade die echten Aufträge aus dem AuftraegeService
    this.loadData('offene', this.offeneAuftraegeDataSource, this.auftragService.getOffeneAuftraege());
    this.loadData('terminierte', this.terminierteAuftraegeDataSource, this.auftragService.getTerminierteAuftraege());
    this.loadData('inBearbeitung', this.inBearbeitungAuftraegeDataSource, this.auftragService.getInBearbeitungAuftraege());
  }

  ngAfterViewInit() {
    const [offenePaginator, terminiertePaginator, inBearbeitungPaginator] = this.paginators.toArray();
    this.initializePaginator(this.offeneAuftraegeDataSource, offenePaginator);
    this.initializePaginator(this.terminierteAuftraegeDataSource, terminiertePaginator);
    this.initializePaginator(this.inBearbeitungAuftraegeDataSource, inBearbeitungPaginator);
  }

  private loadData(
    type: string,
    dataSource: MatTableDataSource<any>,
    data: any[]
  ) {
    dataSource.data = data;
    this.fillPlaceholderRows(type, dataSource);
  }

  private fillPlaceholderRows(type: string, dataSource: MatTableDataSource<any>) {
    const PLACEHOLDER_ROWS = 3;
    const filledData = [...dataSource.data];
    const placeholder = this.createPlaceholder(type);
    while (filledData.length < PLACEHOLDER_ROWS) {
      filledData.push(placeholder);
    }
    dataSource.data = filledData;
  }

  private createPlaceholder(type: string): any {
    return {
      auftragId: null,
      kennzeichen: null,
      marke: null,
      fahrtuechtig: null,
      standort: null,
      erstelltAm: null,
      ...(type === 'terminierte' && { abgabeOrt: null, abgabeBestaetigt: null }),
      ...(type === 'inBearbeitung' && { bearbeiter: null, reparaturStart: null }),
    };
  }

  private initializePaginator(dataSource: MatTableDataSource<any>, paginator: MatPaginator) {
    dataSource.paginator = paginator;
  }
}
