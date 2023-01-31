import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpLightingDiceComponent } from './pop-up-lighting-dice.component';

describe('PopUpLightingDiceComponent', () => {
  let component: PopUpLightingDiceComponent;
  let fixture: ComponentFixture<PopUpLightingDiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpLightingDiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpLightingDiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
