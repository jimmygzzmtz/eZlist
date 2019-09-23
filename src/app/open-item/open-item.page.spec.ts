import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenItemPage } from './open-item.page';

describe('OpenItemPage', () => {
  let component: OpenItemPage;
  let fixture: ComponentFixture<OpenItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenItemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
