import { TestBed } from '@angular/core/testing';
import { type } from '../model/type.model';

describe('Type', () => {
  let service: type;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(type);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
