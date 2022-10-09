import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOpinionComponent } from './customer-opinion.component';

describe('CustomerOpinionComponent', () => {
  let component: CustomerOpinionComponent;
  let fixture: ComponentFixture<CustomerOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOpinionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
