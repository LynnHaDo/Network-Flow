import { TestBed } from '@angular/core/testing';

import { GraphInitService } from './graph-init.service';

describe('GraphInitService', () => {
  let service: GraphInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
