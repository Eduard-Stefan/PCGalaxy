import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MousePadsComponent } from './mouse-pads.component';

describe('MousePadsComponent', () => {
  let component: MousePadsComponent;
  let fixture: ComponentFixture<MousePadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MousePadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MousePadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
