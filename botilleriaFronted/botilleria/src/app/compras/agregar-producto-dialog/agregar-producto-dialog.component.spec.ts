import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProductoDialogComponent } from './agregar-producto-dialog.component';

describe('AgregarProductoDialogComponent', () => {
  let component: AgregarProductoDialogComponent;
  let fixture: ComponentFixture<AgregarProductoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarProductoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarProductoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
