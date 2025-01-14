import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbgeschlosseneAuftraegeComponent } from './abgeschlossene-auftraege.component';

describe('AbgeschlosseneAuftraegeComponent', () => {
  let component: AbgeschlosseneAuftraegeComponent;
  let fixture: ComponentFixture<AbgeschlosseneAuftraegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbgeschlosseneAuftraegeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbgeschlosseneAuftraegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
