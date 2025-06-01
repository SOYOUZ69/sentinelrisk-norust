import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualScanComponent } from './manual-scan.component';

describe('ManualScanComponent', () => {
  let component: ManualScanComponent;
  let fixture: ComponentFixture<ManualScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualScanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManualScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
