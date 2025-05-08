import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AssessmentService } from './assessment.service';
import { ApiService } from '../../../core/services/api.service';

describe('AssessmentService', () => {
  let service: AssessmentService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['get', 'post', 'put', 'delete']);
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AssessmentService,
        { provide: ApiService, useValue: spy }
      ]
    });
    
    service = TestBed.inject(AssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
}); 