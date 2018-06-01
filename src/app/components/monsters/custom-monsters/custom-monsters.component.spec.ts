import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMonstersComponent } from './custom-monsters.component';

describe('CustomMonstersComponent', () => {
  let component: CustomMonstersComponent;
  let fixture: ComponentFixture<CustomMonstersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomMonstersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMonstersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
