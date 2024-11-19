import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessManagerTableComponent } from './business-manager-table.component';

describe('BusinessManagerTableComponent', () => {
  let component: BusinessManagerTableComponent;
  let fixture: ComponentFixture<BusinessManagerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessManagerTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessManagerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
