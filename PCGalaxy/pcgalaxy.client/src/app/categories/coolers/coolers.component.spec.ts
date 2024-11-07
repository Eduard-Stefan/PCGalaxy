import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolersComponent } from './coolers.component';

describe('CoolersComponent', () => {
  let component: CoolersComponent;
  let fixture: ComponentFixture<CoolersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoolersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoolersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
