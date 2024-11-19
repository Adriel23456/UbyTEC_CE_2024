import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAssociateTableComponent } from './business-associate-table.component';

describe('BusinessAssociateTableComponent', () => {
  let component: BusinessAssociateTableComponent;
  let fixture: ComponentFixture<BusinessAssociateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessAssociateTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessAssociateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
