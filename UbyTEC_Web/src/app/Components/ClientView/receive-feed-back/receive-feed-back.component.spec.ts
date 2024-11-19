import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveFeedBackComponent } from './receive-feed-back.component';

describe('ReceiveFeedBackComponent', () => {
  let component: ReceiveFeedBackComponent;
  let fixture: ComponentFixture<ReceiveFeedBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiveFeedBackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveFeedBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
