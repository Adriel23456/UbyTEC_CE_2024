import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyStateComponent } from './modify-state.component';

describe('ModifyStateComponent', () => {
  let component: ModifyStateComponent;
  let fixture: ComponentFixture<ModifyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
