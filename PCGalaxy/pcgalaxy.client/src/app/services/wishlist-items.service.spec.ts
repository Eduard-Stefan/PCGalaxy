import { TestBed } from '@angular/core/testing';

import { WishlistItemsService } from './wishlist-items.service';

describe('WishlistItemsService', () => {
  let service: WishlistItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
