import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreamodifyComponent } from './areamodify.component';

describe('AreamodifyComponent', () => {
  let component: AreamodifyComponent;
  let fixture: ComponentFixture<AreamodifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreamodifyComponent]
    });
    fixture = TestBed.createComponent(AreamodifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
