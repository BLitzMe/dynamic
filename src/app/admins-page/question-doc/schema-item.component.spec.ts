import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaItemComponent } from './question-doc.component';

describe('SchemaItemComponent', () => {
  let component: SchemaItemComponent;
  let fixture: ComponentFixture<SchemaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
