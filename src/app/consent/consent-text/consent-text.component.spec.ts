import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentTextComponent } from './consent-text.component';

describe('ConsentTextComponent', () => {
  let component: ConsentTextComponent;
  let fixture: ComponentFixture<ConsentTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsentTextComponent]
    });
    fixture = TestBed.createComponent(ConsentTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
