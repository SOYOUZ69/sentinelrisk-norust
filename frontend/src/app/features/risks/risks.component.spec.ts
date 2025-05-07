import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RisksComponent } from './risks.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RiskService } from './services/risk.service';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('RisksComponent', () => {
  let component: RisksComponent;
  let fixture: ComponentFixture<RisksComponent>;
  let riskServiceSpy: jasmine.SpyObj<RiskService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const riskServiceMock = jasmine.createSpyObj('RiskService', ['getRisks', 'createRisk', 'updateRisk', 'deleteRisk']);
    const dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    const snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    riskServiceMock.getRisks.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [RisksComponent],
      imports: [
        NoopAnimationsModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule
      ],
      providers: [
        { provide: RiskService, useValue: riskServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    riskServiceSpy = TestBed.inject(RiskService) as jasmine.SpyObj<RiskService>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(RisksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load risks on init', () => {
    expect(riskServiceSpy.getRisks).toHaveBeenCalled();
  });

  it('should navigate to risk details when viewRisk is called', () => {
    const mockRisk = { id: '123', name: 'Test Risk' };
    component.viewRisk(mockRisk as any);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/risks', '123']);
  });

  it('should show error when viewRisk is called with invalid risk', () => {
    component.viewRisk({} as any);
    expect(snackBarSpy.open).toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should have visibility button in actions column', () => {
    component.risks = [{ id: '123', name: 'Test Risk' }] as any[];
    fixture.detectChanges();
    
    const viewButton = fixture.nativeElement.querySelector('button[matTooltip="Voir les détails"]');
    expect(viewButton).toBeTruthy();
  });

  it('should call viewRisk when view button is clicked', () => {
    component.risks = [{ id: '123', name: 'Test Risk' }] as any[];
    fixture.detectChanges();
    
    spyOn(component, 'viewRisk');
    const viewButton = fixture.nativeElement.querySelector('button[matTooltip="Voir les détails"]');
    viewButton.click();
    
    expect(component.viewRisk).toHaveBeenCalled();
  });
}); 