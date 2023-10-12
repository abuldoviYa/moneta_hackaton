import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPageUiComponent } from './card-page-ui.component';

describe('CardPageUiComponent', () => {
  let component: CardPageUiComponent;
  let fixture: ComponentFixture<CardPageUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardPageUiComponent]
    });
    fixture = TestBed.createComponent(CardPageUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
