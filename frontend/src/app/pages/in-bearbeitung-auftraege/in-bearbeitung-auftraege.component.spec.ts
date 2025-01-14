import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InBearbeitungAuftraegeComponent } from './in-bearbeitung-auftraege.component';

describe('InBearbeitungAuftraegeComponent', () => {
  let component: InBearbeitungAuftraegeComponent;
  let fixture: ComponentFixture<InBearbeitungAuftraegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InBearbeitungAuftraegeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InBearbeitungAuftraegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
