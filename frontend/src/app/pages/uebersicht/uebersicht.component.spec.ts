// frontend/src/app/pages/uebersicht/uebersicht.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UebersichtComponent }       from './uebersicht.component';
import { TableComponent }            from '../../shared/components/table/table.component';
import { HttpClientTestingModule }   from '@angular/common/http/testing';
import { NoopAnimationsModule }      from '@angular/platform-browser/animations';
import { MatTableModule }            from '@angular/material/table';
import { MatPaginatorModule }        from '@angular/material/paginator';

describe('UebersichtComponent', () => {
  let component: UebersichtComponent;
  let fixture: ComponentFixture<UebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UebersichtComponent,     // standalone component
        TableComponent,          // standalone component
        HttpClientTestingModule,
        NoopAnimationsModule,
        MatTableModule,
        MatPaginatorModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
