import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFotosComponent } from './update-fotos.component';

describe('UpdateFotosComponent', () => {
  let component: UpdateFotosComponent;
  let fixture: ComponentFixture<UpdateFotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFotosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
