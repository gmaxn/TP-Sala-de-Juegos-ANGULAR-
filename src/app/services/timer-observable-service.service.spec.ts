import { TestBed } from '@angular/core/testing';

import { TimerObservableServiceService } from './timer-observable-service.service';

describe('TimerObservableServiceService', () => {
  let service: TimerObservableServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerObservableServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
