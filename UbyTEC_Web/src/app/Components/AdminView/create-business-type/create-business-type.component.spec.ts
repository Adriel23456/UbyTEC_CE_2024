import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBusinessTypeComponent } from './create-business-type.component';

describe('CreateBusinessTypeComponent', () => {
  let component: CreateBusinessTypeComponent;
  let fixture: ComponentFixture<CreateBusinessTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBusinessTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBusinessTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
