import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavBusinessManagerComponent } from './sidenav-business-manager.component';

describe('SidenavBusinessManagerComponent', () => {
  let component: SidenavBusinessManagerComponent;
  let fixture: ComponentFixture<SidenavBusinessManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavBusinessManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavBusinessManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
