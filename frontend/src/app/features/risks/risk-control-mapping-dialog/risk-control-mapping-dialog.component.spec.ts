import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskControlMappingDialogComponent } from './risk-control-mapping-dialog.component';

describe('RiskControlMappingDialogComponent', () => {
  let component: RiskControlMappingDialogComponent;
  let fixture: ComponentFixture<RiskControlMappingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiskControlMappingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RiskControlMappingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
