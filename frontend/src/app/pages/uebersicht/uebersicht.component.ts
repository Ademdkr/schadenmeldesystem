import {AfterViewInit, Component, ViewChild, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MaterialModule} from '../../shared/modules/material.module';
import {AuftraegeService} from '../../shared/services/auftraege.service'; // Füge den Import des Services hinzu
import {TableComponent} from '../../shared/components/table/table.component';

@Component({
  selector: 'app-uebersicht',
  standalone: true,
  imports: [
    MaterialModule, TableComponent
  ],
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.css']
})
export class UebersichtComponent implements OnInit, AfterViewInit {
  offeneAuftraegeDisplayedColumns: string[] = ['auftragId', 'kennzeichen', 'marke', 'fahrtuechtig', 'standort', 'erstelltAm'];
  terminierteAuftraegeDisplayedColumns: string[] = ['auftragId', 'kennzeichen', 'marke', 'abgabeTermin', 'abgabeOrt', 'abgabeBestaetigt'];
  inBearbeitungAuftraegeDisplayedColumns: string[] = ['auftragId', 'kennzeichen', 'marke', 'bearbeiter', 'reparaturStart'];

  offeneAuftraegeDataSource = new MatTableDataSource<any>([]);
  terminierteAuftraegeDataSource = new MatTableDataSource<any>([]);
  inBearbeitungAuftraegeDataSource = new MatTableDataSource<any>([]);

  @ViewChildren(MatPaginator) paginators!: QueryList<MatPaginator>;

  constructor(private auftraegeService: AuftraegeService) {
  }

  ngOnInit() {
    // Lade die echten Aufträge aus dem AuftraegeService
    this.loadData('offene', this.offeneAuftraegeDataSource, this.auftraegeService.getOffeneAuftraege());
    this.loadData('terminierte', this.terminierteAuftraegeDataSource, this.auftraegeService.getTerminierteAuftraege());
    this.loadData('inBearbeitung', this.inBearbeitungAuftraegeDataSource, this.auftraegeService.getInBearbeitungAuftraege());
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
