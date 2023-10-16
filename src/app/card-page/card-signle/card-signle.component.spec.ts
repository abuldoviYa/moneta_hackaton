import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSignleComponent } from './card-signle.component';

describe('CardSignleComponent', () => {
  let component: CardSignleComponent;
  let fixture: ComponentFixture<CardSignleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardSignleComponent]
    });
    fixture = TestBed.createComponent(CardSignleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
