import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisieComponent } from './saisie.component';

describe('SaisieComponent', () => {
  let component: SaisieComponent;
  let fixture: ComponentFixture<SaisieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaisieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaisieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
