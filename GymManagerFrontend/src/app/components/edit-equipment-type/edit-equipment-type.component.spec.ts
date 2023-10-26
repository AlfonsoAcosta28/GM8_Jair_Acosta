import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEquipmentTypeComponent } from './edit-equipment-type.component';

describe('EditEquipmentTypeComponent', () => {
  let component: EditEquipmentTypeComponent;
  let fixture: ComponentFixture<EditEquipmentTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEquipmentTypeComponent]
    });
    fixture = TestBed.createComponent(EditEquipmentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
