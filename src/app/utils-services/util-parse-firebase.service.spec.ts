import { TestBed, inject } from '@angular/core/testing';

import { UtilsParseFromFirebaseService } from './util-parse-firebase.service';

describe('UtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsParseFromFirebaseService]
    });
  });

  it('should be created', inject([UtilsParseFromFirebaseService], (service: UtilsParseFromFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
