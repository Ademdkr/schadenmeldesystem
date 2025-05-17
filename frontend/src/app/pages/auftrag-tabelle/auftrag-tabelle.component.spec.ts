// frontend/src/app/pages/uebersicht/auftrag-tabelle.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuftragTabelleComponent } from './auftrag-tabelle.component';
import { TableComponent }            from '../../shared/components/table/table.component';
import { HttpClientTestingModule }   from '@angular/common/http/testing';
import { RouterTestingModule }       from '@angular/router/testing';
import { MatTableModule }            from '@angular/material/table';
import { MatPaginatorModule }        from '@angular/material/paginator';
import { NoopAnimationsModule }      from '@angular/platform-browser/animations';

describe('AuftragTabelleComponent', () => {
  let component: AuftragTabelleComponent;
  let fixture: ComponentFixture<AuftragTabelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuftragTabelleComponent],  // non-standalone component
      imports: [
        TableComponent,          // standalone component
        HttpClientTestingModule,
        RouterTestingModule,
        MatTableModule,
        MatPaginatorModule,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuftragTabelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
