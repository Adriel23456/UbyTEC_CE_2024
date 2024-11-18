import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFotosComponent } from './crear-fotos.component';

describe('CrearFotosComponent', () => {
  let component: CrearFotosComponent;
  let fixture: ComponentFixture<CrearFotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearFotosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
