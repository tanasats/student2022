import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActtypeCreateComponent } from './acttype-create.component';

describe('ActtypeCreateComponent', () => {
  let component: ActtypeCreateComponent;
  let fixture: ComponentFixture<ActtypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActtypeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActtypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
