import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuftragErstellenComponent } from './auftrag-erstellen.component';

describe('AuftragErstellenComponent', () => {
  let component: AuftragErstellenComponent;
  let fixture: ComponentFixture<AuftragErstellenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuftragErstellenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuftragErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
