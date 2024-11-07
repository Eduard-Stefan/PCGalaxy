import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcCasesComponent } from './pc-cases.component';

describe('PcCasesComponent', () => {
  let component: PcCasesComponent;
  let fixture: ComponentFixture<PcCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PcCasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
