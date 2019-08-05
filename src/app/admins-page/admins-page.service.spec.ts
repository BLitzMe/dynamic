import { TestBed } from '@angular/core/testing';

import { AdminsPageService } from './admins-page.service';

describe('AdminsPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminsPageService = TestBed.get(AdminsPageService);
    expect(service).toBeTruthy();
  });
});
