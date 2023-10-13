import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestonlypageComponent } from './testonlypage.component';

describe('TestonlypageComponent', () => {
  let component: TestonlypageComponent;
  let fixture: ComponentFixture<TestonlypageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestonlypageComponent]
    });
    fixture = TestBed.createComponent(TestonlypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
