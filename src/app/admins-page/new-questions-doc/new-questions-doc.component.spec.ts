import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuestionsDocComponent } from './new-questions-doc.component';

describe('NewQuestionsDocComponent', () => {
  let component: NewQuestionsDocComponent;
  let fixture: ComponentFixture<NewQuestionsDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQuestionsDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuestionsDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
