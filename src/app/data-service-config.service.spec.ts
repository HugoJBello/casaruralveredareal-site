import { TestBed, inject } from '@angular/core/testing';

import { DataServiceConfigService } from './data-service-config.service';

describe('DataServiceConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataServiceConfigService]
    });
  });

  it('should be created', inject([DataServiceConfigService], (service: DataServiceConfigService) => {
    expect(service).toBeTruthy();
  }));
});
