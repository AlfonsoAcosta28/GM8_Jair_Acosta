import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditorDComponent } from './user-editor.component';

describe('UserEditorComponent', () => {
  let component: UserEditorDComponent;
  let fixture: ComponentFixture<UserEditorDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEditorDComponent]
    });
    fixture = TestBed.createComponent(UserEditorDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
