import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionesListComponent } from './funciones-list.component';

describe('FuncionesListComponent', () => {
  let component: FuncionesListComponent;
  let fixture: ComponentFixture<FuncionesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
