// frontend/src/app/pages/auftrag-erstellen/auftrag-erstellen.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuftragErstellenComponent } from './auftrag-erstellen.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule }      from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule }     from '@angular/platform-browser/animations';
import { MatFormFieldModule }       from '@angular/material/form-field';
import { MatInputModule }           from '@angular/material/input';
import { MatSelectModule }          from '@angular/material/select';
import { MatCheckboxModule }        from '@angular/material/checkbox';
import { MatButtonModule }          from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA }   from '@angular/core';

describe('AuftragErstellenComponent', () => {
  let component: AuftragErstellenComponent;
  let fixture: ComponentFixture<AuftragErstellenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuftragErstellenComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,    // stellt MatInput usw. bereit
        MatInputModule,
        MatSelectModule,       // falls du <mat-select> nutzt
        MatCheckboxModule,     // falls du <mat-checkbox> nutzt
        MatButtonModule,       // falls du <button mat-button> nutzt
        NoopAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AuftragErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
