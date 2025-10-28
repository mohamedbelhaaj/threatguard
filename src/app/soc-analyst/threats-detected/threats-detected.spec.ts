import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatsDetected } from './threats-detected';

describe('ThreatsDetected', () => {
  let component: ThreatsDetected;
  let fixture: ComponentFixture<ThreatsDetected>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreatsDetected]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreatsDetected);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
