import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAddresComponent } from './add-addres.component';

describe('AddAddresComponent', () => {
  let component: AddAddresComponent;
  let fixture: ComponentFixture<AddAddresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAddresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAddresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
