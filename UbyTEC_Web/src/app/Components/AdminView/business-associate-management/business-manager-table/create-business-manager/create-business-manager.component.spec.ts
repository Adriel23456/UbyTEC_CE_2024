import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBusinessManagerComponent } from './create-business-manager.component';

describe('CreateBusinessManagerComponent', () => {
  let component: CreateBusinessManagerComponent;
  let fixture: ComponentFixture<CreateBusinessManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBusinessManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBusinessManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
