import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { AssetFormComponent } from './asset-form.component';
import { SnmpService } from '../../services/snmp.service';
import { Asset, AssetType, SnmpVersion } from '../../models/asset.model';
import { SnmpModule } from '../../snmp.module';

describe('AssetFormComponent', () => {
  let component: AssetFormComponent;
  let fixture: ComponentFixture<AssetFormComponent>;
  let mockSnmpService: jasmine.SpyObj<SnmpService>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<AssetFormComponent>>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  const mockAsset: Asset = {
    id: 1,
    hostname: 'test-server',
    ipAddress: '192.168.1.100',
    type: AssetType.SERVER,
    snmpVersion: SnmpVersion.V2C,
    port: 161,
    community: 'public',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(async () => {
    const snmpServiceSpy = jasmine.createSpyObj('SnmpService', [
      'createAsset', 'updateAsset', 'testConnection'
    ]);
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [AssetFormComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        SnmpModule
      ],
      providers: [
        { provide: SnmpService, useValue: snmpServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AssetFormComponent);
    component = fixture.componentInstance;
    mockSnmpService = TestBed.inject(SnmpService) as jasmine.SpyObj<SnmpService>;
    mockDialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<AssetFormComponent>>;
    mockSnackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  describe('Initialisation du composant', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize form with default values', () => {
      component.ngOnInit();
      
      expect(component.assetForm.get('port')?.value).toBe(161);
      expect(component.assetForm.get('active')?.value).toBe(true);
      expect(component.isEditMode).toBe(false);
    });

    it('should populate form in edit mode', () => {
      component.data = { asset: mockAsset };
      component.isEditMode = true;
      
      component.ngOnInit();
      
      expect(component.assetForm.get('hostname')?.value).toBe(mockAsset.hostname);
      expect(component.assetForm.get('ipAddress')?.value).toBe(mockAsset.ipAddress);
      expect(component.assetForm.get('type')?.value).toBe(mockAsset.type);
    });
  });

  describe('Validation du formulaire', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should be invalid when required fields are empty', () => {
      expect(component.assetForm.valid).toBeFalsy();
      