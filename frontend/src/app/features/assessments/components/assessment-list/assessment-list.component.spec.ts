import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { AssessmentListComponent } from './assessment-list.component';
import { AssessmentService } from '../../services/assessment.service';

describe('AssessmentListComponent', () => {
  let component: AssessmentListComponent;
  let fixture: ComponentFixture<AssessmentListComponent>;
  let assessmentServiceSpy: jasmine.SpyObj<AssessmentService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AssessmentService', ['getAssessments']);
    spy.getAssessments.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [AssessmentListComponent],
      imports: [
        NoopAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatSnackBarModule,
        MatDialogModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AssessmentService, useValue: spy }
      ]
    });

    fixture = TestBed.createComponent(AssessmentListComponent);
    component = fixture.componentInstance;
    assessmentServiceSpy = TestBed.inject(AssessmentService) as jasmine.SpyObj<AssessmentService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a mat-table element', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('table[mat-table]')).toBeTruthy();
  });

  it('should call getAssessments method on initialization', () => {
    fixture.detectChanges();
    expect(assessmentServiceSpy.getAssessments).toHaveBeenCalled();
  });
});
