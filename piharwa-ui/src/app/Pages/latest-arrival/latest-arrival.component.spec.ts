import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestArrivalComponent } from './latest-arrival.component';

describe('LatestArrivalComponent', () => {
  let component: LatestArrivalComponent;
  let fixture: ComponentFixture<LatestArrivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestArrivalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
