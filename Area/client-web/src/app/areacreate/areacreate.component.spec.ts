import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreacreateComponent } from './areacreate.component';

describe('AreacreateComponent', () => {
  let component: AreacreateComponent;
  let fixture: ComponentFixture<AreacreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreacreateComponent]
    });
    fixture = TestBed.createComponent(AreacreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
