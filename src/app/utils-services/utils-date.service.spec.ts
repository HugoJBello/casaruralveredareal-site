import { TestBed, inject } from '@angular/core/testing';

import { UtilsDateService } from './utils-date.service';

describe('UtilsDateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsDateService]
    });
  });

  it('should be created', inject([UtilsDateService], (service: UtilsDateService) => {
    expect(service).toBeTruthy();
  }));
});
