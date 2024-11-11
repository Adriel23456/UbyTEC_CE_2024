import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementOrdersComponent } from './management-orders.component';

describe('ManagementOrdersComponent', () => {
  let component: ManagementOrdersComponent;
  let fixture: ComponentFixture<ManagementOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
