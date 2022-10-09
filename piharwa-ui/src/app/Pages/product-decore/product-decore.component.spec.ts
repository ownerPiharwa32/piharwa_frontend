import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDecoreComponent } from './product-decore.component';

describe('ProductDecoreComponent', () => {
  let component: ProductDecoreComponent;
  let fixture: ComponentFixture<ProductDecoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDecoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDecoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
