import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPagesManagerComponent } from './history-pages-manager.component';

describe('HistoryPagesManagerComponent', () => {
  let component: HistoryPagesManagerComponent;
  let fixture: ComponentFixture<HistoryPagesManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryPagesManagerComponent]
    });
    fixture = TestBed.createComponent(HistoryPagesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
