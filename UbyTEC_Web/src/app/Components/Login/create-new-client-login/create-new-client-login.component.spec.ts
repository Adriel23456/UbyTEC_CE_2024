import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewClientLoginComponent } from './create-new-client-login.component';

describe('CreateNewClientLoginComponent', () => {
  let component: CreateNewClientLoginComponent;
  let fixture: ComponentFixture<CreateNewClientLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewClientLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewClientLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
