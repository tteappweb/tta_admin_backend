import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesBienvenidaComponent } from './slides-bienvenida.component';

describe('SlidesBienvenidaComponent', () => {
  let component: SlidesBienvenidaComponent;
  let fixture: ComponentFixture<SlidesBienvenidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidesBienvenidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesBienvenidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
