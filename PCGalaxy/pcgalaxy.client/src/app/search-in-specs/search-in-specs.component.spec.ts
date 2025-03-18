import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInSpecsComponent } from './search-in-specs.component';

describe('SearchInSpecsComponent', () => {
  let component: SearchInSpecsComponent;
  let fixture: ComponentFixture<SearchInSpecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchInSpecsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInSpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
