import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectNodesComponent } from './select-nodes.component';

describe('SelectNodesComponent', () => {
  let component: SelectNodesComponent;
  let fixture: ComponentFixture<SelectNodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectNodesComponent]
    });
    fixture = TestBed.createComponent(SelectNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
