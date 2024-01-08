import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaAddModalComponent } from './area-add-modal.component';

describe('AreaAddModalComponent', () => {
  let component: AreaAddModalComponent;
  let fixture: ComponentFixture<AreaAddModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaAddModalComponent]
    });
    fixture = TestBed.createComponent(AreaAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
