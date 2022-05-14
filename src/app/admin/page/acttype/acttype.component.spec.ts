import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActtypeComponent } from './acttype.component';

describe('ActtypeComponent', () => {
  let component: ActtypeComponent;
  let fixture: ComponentFixture<ActtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
