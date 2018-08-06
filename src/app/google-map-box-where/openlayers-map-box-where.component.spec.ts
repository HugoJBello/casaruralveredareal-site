import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenlayersMapBoxWhereComponent } from './openlayers-map-box-where.component';

describe('OpenlayersMapBoxWhereComponent', () => {
  let component: OpenlayersMapBoxWhereComponent;
  let fixture: ComponentFixture<OpenlayersMapBoxWhereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenlayersMapBoxWhereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenlayersMapBoxWhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
