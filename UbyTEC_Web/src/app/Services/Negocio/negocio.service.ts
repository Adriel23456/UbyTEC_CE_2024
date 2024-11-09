import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  constructor() { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    cedula: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('',  [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    no_sinpe: new FormControl('', Validators.required),
    admin: new FormControl(0, Validators.required),
  })
}
