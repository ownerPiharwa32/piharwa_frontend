import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdressContactComponent } from './add-adress-contact.component';

describe('AddAdressContactComponent', () => {
  let component: AddAdressContactComponent;
  let fixture: ComponentFixture<AddAdressContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdressContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdressContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
