import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorganizationComponent } from './actorganization.component';

describe('ActorganizationComponent', () => {
  let component: ActorganizationComponent;
  let fixture: ComponentFixture<ActorganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorganizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
