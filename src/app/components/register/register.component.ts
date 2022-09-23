import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    repeatPassword: null,
    firstName: null,
    lastName: null
  }
  inputError = false;
  message = "";
  registered = false;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  register() {
    this.inputError = false;
    this.message = "";

    if (this.form.username == null) {
      this.inputError = true;
      this.message += "Nombre de usuario obligatorio. ";
    }

    if (this.form.email == null) {
      this.inputError = true;
      this.message += "Correo electrónico obligatorio. ";
    } else if (!(this.form.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))) {
      this.inputError = true;
      this.message += "El correo electrónico no cumple el formato correcto. ";
    }

    if (this.form.password == null) {
      this.inputError = true;
      this.message += "Contraseña obligatoria. ";
    } else if (this.form.password != this.form.repeatPassword) {
      this.inputError = true;
      this.message += "La contraseña no coincide. ";
    }

    if (this.form.firstName == null) {
      this.inputError = true;
      this.message += "Nombre obligatorio. ";
    }

    if (this.form.lastName == null) {
      this.inputError = true;
      this.message += "Apellido obligatorio. ";
    }

    let checkbox = <HTMLInputElement> document.getElementById("terms-check");
    if( !checkbox.checked ) {
      this.inputError = true;
      this.message += "Debes aceptar los terminos y condiciones. ";
    }

    if (this.inputError == false) {
      let user: User = {
        username: this.form.username,
        email: this.form.email,
        password: this.form.password,
        first_name: this.form.firstName,
        last_name: this.form.lastName
      };

      this.userService.create(user).subscribe(
        data => {
          console.log(data);
          this.message = "Cuenta creada correctamente. Redirigiendo...";
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2000);
        }, error => {
          console.log(error);
        }
      );
    }
  }

}
