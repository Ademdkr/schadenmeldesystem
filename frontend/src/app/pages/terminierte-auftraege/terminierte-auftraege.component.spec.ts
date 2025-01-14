import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminierteAuftraegeComponent } from './terminierte-auftraege.component';

describe('TerminierteAuftraegeComponent', () => {
  let component: TerminierteAuftraegeComponent;
  let fixture: ComponentFixture<TerminierteAuftraegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminierteAuftraegeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminierteAuftraegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
