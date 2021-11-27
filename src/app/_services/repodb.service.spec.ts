import { TestBed } from '@angular/core/testing';

import { RepodbService } from './repodb.service';

describe('RepodbService', () => {
  let service: RepodbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepodbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
