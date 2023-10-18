import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitHomeComponent } from './init-home.component';

describe('InitHomeComponent', () => {
  let component: InitHomeComponent;
  let fixture: ComponentFixture<InitHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitHomeComponent]
    });
    fixture = TestBed.createComponent(InitHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
