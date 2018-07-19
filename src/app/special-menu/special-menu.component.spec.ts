import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialMenuComponent } from './special-menu.component';

describe('SpecialMenuComponent', () => {
  let component: SpecialMenuComponent;
  let fixture: ComponentFixture<SpecialMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
