import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueAndAeyComponent } from './que-and-aey.component';

describe('QueAndAeyComponent', () => {
  let component: QueAndAeyComponent;
  let fixture: ComponentFixture<QueAndAeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueAndAeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueAndAeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
