import { TestBed } from '@angular/core/testing';

import { FiltatoService } from './filtato.service';

describe('FiltatoService', () => {
  let service: FiltatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
