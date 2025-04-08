import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConfiguracionesComponent } from './user-configuraciones.component';

describe('UserConfiguracionesComponent', () => {
  let component: UserConfiguracionesComponent;
  let fixture: ComponentFixture<UserConfiguracionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserConfiguracionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserConfiguracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
