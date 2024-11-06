import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavClientComponent } from './sidenav-client.component';

describe('SidenavClientComponent', () => {
  let component: SidenavClientComponent;
  let fixture: ComponentFixture<SidenavClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
