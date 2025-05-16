// frontend/src/app/pages/auftrag-detail/auftrag-detail.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuftragDetailComponent } from './auftrag-detail.component';
import { DateFormatPipe } from '../../shared/utils/date-format.pipe';      // Pfad prüfen!
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule }     from '@angular/router/testing';
import { NoopAnimationsModule }    from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA }  from '@angular/core';

describe('AuftragDetailComponent', () => {
  let component: AuftragDetailComponent;
  let fixture: ComponentFixture<AuftragDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AuftragDetailComponent,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AuftragDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
