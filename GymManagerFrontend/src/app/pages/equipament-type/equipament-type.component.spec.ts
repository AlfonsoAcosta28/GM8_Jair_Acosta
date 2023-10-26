import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentTypeComponent } from './equipament-type.component';

describe('EquipamentTypeComponent', () => {
  let component: EquipamentTypeComponent;
  let fixture: ComponentFixture<EquipamentTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipamentTypeComponent]
    });
    fixture = TestBed.createComponent(EquipamentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
