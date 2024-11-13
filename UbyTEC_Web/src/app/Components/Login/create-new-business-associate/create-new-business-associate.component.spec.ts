import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewBusinessAssociateComponent } from './create-new-business-associate.component';

describe('CreateNewBusinessAssociateComponent', () => {
  let component: CreateNewBusinessAssociateComponent;
  let fixture: ComponentFixture<CreateNewBusinessAssociateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewBusinessAssociateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewBusinessAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
