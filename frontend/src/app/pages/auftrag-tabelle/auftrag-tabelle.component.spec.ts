import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuftragTabelleComponent } from './auftrag-tabelle.component';

describe('AuftragTabelleComponent', () => {
  let component: AuftragTabelleComponent;
  let fixture: ComponentFixture<AuftragTabelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuftragTabelleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuftragTabelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
