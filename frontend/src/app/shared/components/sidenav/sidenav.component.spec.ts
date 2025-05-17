// frontend/src/app/shared/components/sidenav/sidenav.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavComponent } from './sidenav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule }    from '@angular/common/http/testing';
import { NoopAnimationsModule }       from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA }     from '@angular/core';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidenavComponent],      // Komponente deklarieren
      imports: [
        RouterTestingModule,                 // z.B. für RouterLink
        HttpClientTestingModule,             // falls HttpClient im Sidenav genutzt wird
        NoopAnimationsModule                 // für Angular Material Animationen
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]      // ignoriert unbekannte Tags wie <mat-sidenav>
    })
      .compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
