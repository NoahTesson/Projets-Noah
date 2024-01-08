import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutJsonComponent } from './about-json.component';

describe('AboutJsonComponent', () => {
  let component: AboutJsonComponent;
  let fixture: ComponentFixture<AboutJsonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutJsonComponent]
    });
    fixture = TestBed.createComponent(AboutJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
