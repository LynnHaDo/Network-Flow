import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendFlowComponent } from './send-flow.component';

describe('SendFlowComponent', () => {
  let component: SendFlowComponent;
  let fixture: ComponentFixture<SendFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendFlowComponent]
    });
    fixture = TestBed.createComponent(SendFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
