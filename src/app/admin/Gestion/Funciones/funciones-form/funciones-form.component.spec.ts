import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionesFormComponent } from './funciones-form.component';

describe('FuncionesFormComponent', () => {
  let component: FuncionesFormComponent;
  let fixture: ComponentFixture<FuncionesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
