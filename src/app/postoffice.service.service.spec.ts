import { TestBed } from '@angular/core/testing';

import { PostofficeServiceService } from './postoffice.service.service';

describe('PostofficeServiceService', () => {
  let service: PostofficeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostofficeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
