import { TestBed } from '@angular/core/testing';

import {  ApiConfigService} from './api-config.service';

describe('ApiServiceConfigService', () => {
  let service: ApiConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
