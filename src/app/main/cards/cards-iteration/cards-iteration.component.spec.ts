import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsIterationComponent } from './cards-iteration.component';

describe('CardsIterationComponent', () => {
  let component: CardsIterationComponent;
  let fixture: ComponentFixture<CardsIterationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsIterationComponent]
    });
    fixture = TestBed.createComponent(CardsIterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
