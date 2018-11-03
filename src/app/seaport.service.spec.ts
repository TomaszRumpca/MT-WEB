import { TestBed } from '@angular/core/testing';

import { SeaportService } from './seaport.service';

describe('SeaportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeaportService = TestBed.get(SeaportService);
    expect(service).toBeTruthy();
  });
});
