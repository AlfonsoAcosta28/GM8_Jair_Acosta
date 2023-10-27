import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAttendancesComponent } from './member-attendances.component';

describe('MemberAttendancesComponent', () => {
  let component: MemberAttendancesComponent;
  let fixture: ComponentFixture<MemberAttendancesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberAttendancesComponent]
    });
    fixture = TestBed.createComponent(MemberAttendancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
