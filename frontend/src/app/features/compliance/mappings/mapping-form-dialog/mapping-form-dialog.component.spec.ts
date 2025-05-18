import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingFormDialogComponent } from './mapping-form-dialog.component';

describe('MappingFormDialogComponent', () => {
  let component: MappingFormDialogComponent;
  let fixture: ComponentFixture<MappingFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MappingFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MappingFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
