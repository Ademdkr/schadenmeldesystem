import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffeneAuftraegeComponent } from './offene-auftraege.component';

describe('OffeneAuftraegeComponent', () => {
  let component: OffeneAuftraegeComponent;
  let fixture: ComponentFixture<OffeneAuftraegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffeneAuftraegeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffeneAuftraegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
