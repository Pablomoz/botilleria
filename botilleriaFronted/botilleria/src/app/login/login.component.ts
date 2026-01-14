import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form!: FormGroup;
  cargando = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  usuarioNoExiste = false;

ValidarUsuario() {
  console.log("➡️ Método ValidarUsuario() fue llamado");

  this.cargando = true;
  const datos = this.form.value;

  console.log("➡️ Datos enviados al backend:", datos);

  this.authService.ValidarUsuario(datos).subscribe({
    next: (resp: any) => {
      console.log("➡️ Respuesta del backend:", resp);

      if (resp === "NO_EXISTE") {
        this.usuarioNoExiste = true;
        this.errorMsg = "";
        this.cargando = false;
        return;
      }

      if (resp === "INCORRECTO") {
        this.errorMsg = "Contraseña incorrecta";
        this.cargando = false;
        return;
      }

      if (resp === true) {
        this.router.navigate(['/dashboard']);
      }

      this.cargando = false;
    },
    error: (err) => {
      console.log("❌ ERROR:", err);
      this.errorMsg = "Error en el servidor";
      this.cargando = false;
    }
  });
}



CrearCuenta() {
  const email = this.form.get('email')?.value;

  this.router.navigate(['/crear-cuenta'], { queryParams: { email } });
}
}