import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxSmsComponent } from './dialog-box-sms.component';

describe('DialogBoxSmsComponent', () => {
  let component: DialogBoxSmsComponent;
  let fixture: ComponentFixture<DialogBoxSmsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogBoxSmsComponent]
    });
    fixture = TestBed.createComponent(DialogBoxSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
