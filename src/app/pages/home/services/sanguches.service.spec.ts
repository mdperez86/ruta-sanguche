import { TestBed } from '@angular/core/testing';

import { SanguchesService } from './sanguches.service';

describe('SanguchesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SanguchesService = TestBed.get(SanguchesService);
    expect(service).toBeTruthy();
  });
});
