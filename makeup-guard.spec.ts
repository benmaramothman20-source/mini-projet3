import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { makeupGuard } from './makeup-guard';

describe('makeupGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => makeupGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
