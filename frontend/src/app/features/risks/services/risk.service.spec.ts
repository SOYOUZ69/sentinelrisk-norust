import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RiskService } from './risk.service';
import { ApiService } from '../../../core/services/api.service';
import { environment } from '../../../../environments/environment';
import { ImpactLevel, ProbabilityLevel, Risk, RiskStatus } from '../../../core/models/risk.model';

describe('RiskService', () => {
  let service: RiskService;
  let httpMock: HttpTestingController;
  let apiUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RiskService, ApiService]
    });
    service = TestBed.inject(RiskService);
    httpMock = TestBed.inject(HttpTestingController);
    apiUrl = environment.apiUrl;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRisks', () => {
    it('should return an array of risks', () => {
      const mockRisks: Risk[] = [
        {
          id: '1',
          name: 'Test Risk 1',
          description: 'Description of test risk 1',
          categoryId: '1',
          categoryName: 'Security',
          category: { id: '1', name: 'Security' },
          impactLevel: ImpactLevel.SEVERE,
          probabilityLevel: ProbabilityLevel.LIKELY,
          score: 16,
          status: RiskStatus.IDENTIFIED,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          name: 'Test Risk 2',
          description: 'Description of test risk 2',
          categoryId: '2',
          categoryName: 'Compliance',
          category: { id: '2', name: 'Compliance' },
          impactLevel: ImpactLevel.MODERATE,
          probabilityLevel: ProbabilityLevel.POSSIBLE,
          score: 9,
          status: RiskStatus.MITIGATED,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      service.getRisks().subscribe(risks => {
        expect(risks.length).toBe(2);
        expect(risks).toEqual(mockRisks);
      });

      const req = httpMock.expectOne(`${apiUrl}/risks`);
      expect(req.request.method).toBe('GET');
      req.flush(mockRisks);
    });

    it('should handle errors when fetching risks fails', () => {
      service.getRisks().subscribe({
        next: () => fail('should have failed with a 404 error'),
        error: (error) => {
          expect(error.message).toContain('Impossible de récupérer la liste des risques');
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/risks`);
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('createRisk', () => {
    it('should create a risk and return it', () => {
      const newRisk: Partial<Risk> = {
        name: 'New Risk',
        description: 'Description of new risk',
        categoryId: '1',
        categoryName: 'Security',
        category: { id: '1', name: 'Security' },
        impactLevel: ImpactLevel.SEVERE,
        probabilityLevel: ProbabilityLevel.UNLIKELY,
        status: RiskStatus.IDENTIFIED
      };

      const createdRisk: Risk = {
        ...newRisk,
        id: '3',
        score: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      } as Risk;

      service.createRisk(newRisk).subscribe(risk => {
        expect(risk).toEqual(createdRisk);
      });

      const req = httpMock.expectOne(`${apiUrl}/risks`);
      expect(req.request.method).toBe('POST');
      
      // Vérifier que le format de la requête est correct
      expect(req.request.body).toEqual({
        name: newRisk.name,
        description: newRisk.description,
        categoryId: newRisk.category?.id,
        categoryName: newRisk.category?.name,
        impactLevel: newRisk.impactLevel,
        probabilityLevel: newRisk.probabilityLevel,
        status: newRisk.status,
        mitigationPlan: undefined
      });
      
      req.flush(createdRisk);
    });
  });
}); 