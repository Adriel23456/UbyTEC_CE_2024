import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegocioViewComponent } from './negocio-view.component';

describe('NegocioViewComponent', () => {
  let component: NegocioViewComponent;
  let fixture: ComponentFixture<NegocioViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NegocioViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegocioViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
