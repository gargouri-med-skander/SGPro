import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightingDiceComponent } from './lighting-dice.component';

describe('LightingDiceComponent', () => {
  let component: LightingDiceComponent;
  let fixture: ComponentFixture<LightingDiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightingDiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightingDiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
