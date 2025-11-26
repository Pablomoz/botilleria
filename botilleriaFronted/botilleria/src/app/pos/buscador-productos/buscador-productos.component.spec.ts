import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorProductosComponent } from './buscador-productos.component';

describe('BuscadorProductosComponent', () => {
  let component: BuscadorProductosComponent;
  let fixture: ComponentFixture<BuscadorProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscadorProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
