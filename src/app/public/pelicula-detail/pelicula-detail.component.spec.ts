import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaDetailComponent } from './pelicula-detail.component';

describe('PeliculaDetailComponent', () => {
  let component: PeliculaDetailComponent;
  let fixture: ComponentFixture<PeliculaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculaDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeliculaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
