// frontend/src/app/shared/components/table/table.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Type } from '@angular/core';

// Dummy-Interface für Testzwecke
interface TestRow {
  id: number;
  name: string;
}

describe('TableComponent', () => {
  let component: TableComponent<TestRow>;
  let fixture: ComponentFixture<TableComponent<TestRow>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TableComponent as Type<TableComponent<TestRow>>, // Standalone-Component mit Generic
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent<TableComponent<TestRow>>(TableComponent as Type<TableComponent<TestRow>>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // weitere Tests hier…
});
