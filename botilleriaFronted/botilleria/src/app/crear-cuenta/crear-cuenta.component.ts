import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {

  form!: FormGroup;
  cargando = false;
  errorMsg = '';
  exitoMsg = '';
  email = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParams['email'] || '';

    this.form = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  crearCuenta() {
    if (this.form.invalid) {
      return;
    }

    const { password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.errorMsg = 'Las contraseñas no coinciden';
      return;
    }

    this.cargando = true;
    this.errorMsg = '';

    const datos = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.authService.AgregarUsuario(datos).subscribe({
      next: (resp: any) => {
        console.log('Respuesta:', resp);
        if (resp === true || resp === 'true') {
          this.exitoMsg = 'Cuenta creada exitosamente. Redirigiendo...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.errorMsg = 'No se pudo crear la cuenta. Intenta nuevamente.';
        }
        this.cargando = false;
      },
      error: (err) => {
        console.log('Error:', err);
        this.errorMsg = 'Error en el servidor. Intenta más tarde.';
        this.cargando = false;
      }
    });
  }

  volver() {
    this.router.navigate(['/login']);
  }
}
