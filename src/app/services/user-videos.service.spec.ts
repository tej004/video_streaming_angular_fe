import { TestBed } from '@angular/core/testing';

import { UserVideosService } from './user-videos.service';

describe('UserVideosService', () => {
  let service: UserVideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserVideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
