import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorDialogComponent } from './proveedor-dialog.component';

describe('ProveedorDialogComponent', () => {
  let component: ProveedorDialogComponent;
  let fixture: ComponentFixture<ProveedorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
