import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavNegocioComponent } from './sidenav-negocio.component';

describe('SidenavNegocioComponent', () => {
  let component: SidenavNegocioComponent;
  let fixture: ComponentFixture<SidenavNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavNegocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
