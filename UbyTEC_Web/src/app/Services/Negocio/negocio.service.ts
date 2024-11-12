import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  constructor() { }



  admin_form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    usuario: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    telefono: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    direccion: new FormControl('', Validators.required),
  })
}
