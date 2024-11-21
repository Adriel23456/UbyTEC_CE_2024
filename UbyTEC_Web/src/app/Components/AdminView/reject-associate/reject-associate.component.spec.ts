import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectAssociateComponent } from './reject-associate.component';

describe('RejectAssociateComponent', () => {
  let component: RejectAssociateComponent;
  let fixture: ComponentFixture<RejectAssociateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectAssociateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
