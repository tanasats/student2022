import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActtypeUpdateComponent } from './acttype-update.component';

describe('ActtypeUpdateComponent', () => {
  let component: ActtypeUpdateComponent;
  let fixture: ComponentFixture<ActtypeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActtypeUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActtypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
