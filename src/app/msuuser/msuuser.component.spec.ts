import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsuuserComponent } from './msuuser.component';

describe('MsuuserComponent', () => {
  let component: MsuuserComponent;
  let fixture: ComponentFixture<MsuuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsuuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsuuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
