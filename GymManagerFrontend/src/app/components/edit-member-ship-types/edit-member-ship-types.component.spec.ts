import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberShipTypesComponent } from './edit-member-ship-types.component';

describe('EditMemberShipTypesComponent', () => {
  let component: EditMemberShipTypesComponent;
  let fixture: ComponentFixture<EditMemberShipTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMemberShipTypesComponent]
    });
    fixture = TestBed.createComponent(EditMemberShipTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
