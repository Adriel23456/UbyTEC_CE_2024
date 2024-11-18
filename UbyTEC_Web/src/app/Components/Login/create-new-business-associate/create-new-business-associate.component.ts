import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogCreateComponent } from '../dialog-create/dialog-create.component';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { BusinessAssociateService, BusinessAssociateCreate, BusinessAssociatePhone } from '../../../Services/BusinessAssociate/business-associate.service';
import { BusinessTypeService, BusinessType } from '../../../Services/BusinessType/business-type.service';
import { BusinessManagerService } from '../../../Services/BusinessManager/business-manager.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-create-new-business-associate',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './create-new-business-associate.component.html',
  styleUrls: ['./create-new-business-associate.component.css']
})
export class CreateNewBusinessAssociateComponent implements OnInit {
  businessForm: FormGroup;
  phoneDataSource = new MatTableDataSource<number>([]);
  displayedColumns: string[] = ['phone', 'edit', 'delete'];
  businessTypes: BusinessType[] = [];
  managerLoginStatus = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private businessService: BusinessAssociateService,
    private businessTypeService: BusinessTypeService,
    private managerService: BusinessManagerService,
    private router: Router
  ) {
    this.businessForm = this.fb.group({
      // Manager Login (fuera del formulario principal)
      managerEmail: ['', [Validators.required, Validators.email]],
      managerPassword: ['', Validators.required],
      
      // Business Info
      Legal_Id: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      BusinessName: ['', Validators.required],
      Province: ['', Validators.required],
      Canton: ['', Validators.required],
      District: ['', Validators.required],
      SINPE: ['', Validators.required],
      BusinessType_Identification: ['', Validators.required],
      State: ['En espera']
    });

    // Deshabilitar el formulario inicialmente
    this.businessForm.disable();
    this.businessForm.get('managerEmail')?.enable();
    this.businessForm.get('managerPassword')?.enable();
  }

  ngOnInit() {
    // Cargar tipos de negocio al iniciar
    this.businessTypeService.getAll().subscribe({
      next: (types) => {
        this.businessTypes = types;
      },
      error: (error) => {
        this.openDialog('Error', 'Error al cargar los tipos de negocio');
      }
    });
  }

  onManagerLogin(): void {
    const email = this.businessForm.get('managerEmail')?.value;
    const password = this.businessForm.get('managerPassword')?.value;
    if (!email || !password) {
      this.openDialog('Error', 'Debe completar el email y la contraseña')
          .afterClosed()
          .subscribe(() => {
            return;
          });
    } else {
      this.managerService.getByEmail(email).subscribe({
        next: (manager) => {
          if (manager.Password === password) {
            // Login exitoso
            this.openDialog('Éxito', 'Login exitoso del administrador');
            this.managerLoginStatus = true;
            
            // Deshabilitar campos de login
            this.businessForm.get('managerEmail')?.disable();
            this.businessForm.get('managerPassword')?.disable();
            
            // Habilitar el resto del formulario
            this.businessForm.enable();
            
            // Mantener los campos de login deshabilitados
            this.businessForm.get('managerEmail')?.disable();
            this.businessForm.get('managerPassword')?.disable();
          } else {
            this.openDialog('Error', 'Contraseña incorrecta');
          }
        },
        error: (error) => {
          this.openDialog('Error', 'No se encontró el administrador');
        }
      });
    }
  }

  onSubmit(): void {
    if (!this.managerLoginStatus) {
      this.openDialog('Error', 'Debe hacer login con un administrador primero')
          .afterClosed()
          .subscribe(() => {
            return;
          });
    }
  
    if (this.businessForm.valid) {
      if (!this.validatePhones()) {
        return;
      }
  
      const businessData: BusinessAssociateCreate = {
        Legal_Id: this.businessForm.get('Legal_Id')?.value,
        Email: this.businessForm.get('Email')?.value,
        State: 'En espera',
        BusinessName: this.businessForm.get('BusinessName')?.value,
        Province: this.businessForm.get('Province')?.value,
        Canton: this.businessForm.get('Canton')?.value,
        District: this.businessForm.get('District')?.value,
        SINPE: this.businessForm.get('SINPE')?.value,
        BusinessManager_Email: this.businessForm.get('managerEmail')?.value,
        BusinessType_Identification: this.businessForm.get('BusinessType_Identification')?.value
      };
  
      // Crear el negocio primero
      this.businessService.create(businessData).subscribe({
        next: (business) => {
          // Una vez creado el negocio, crear el primer teléfono
          this.createNextPhone(business.Legal_Id, 0, business);
        },
        error: (error) => {
          this.openDialog('Error', 'Error al crear el negocio');
        }
      });
    } else {
      this.openDialog('Error', 'Por favor complete todos los campos requeridos');
    }
  }

  private createNextPhone(legalId: number, index: number, business: any): void {
    const phones = this.phoneDataSource.data;
    // Si ya procesamos todos los teléfonos, mostrar éxito y redirigir
    if (index >= phones.length) {
      this.openDialog('Registro correcto', 'Se registró correctamente el nuevo negocio')
          .afterClosed()
          .subscribe(() => {
            this.router.navigate(['/login']);
          });
      return;
    }
    // Crear el teléfono actual
    const phoneData: BusinessAssociatePhone = {
      BusinessAssociate_Legal_Id: legalId,
      Phone: phones[index]
    };
  
    this.businessService.createPhone(phoneData).subscribe({
      next: () => {
        // Crear el siguiente teléfono
        this.createNextPhone(legalId, index + 1, business);
      },
      error: (error) => {
        this.openDialog('Error', 'Error al crear el teléfono');
      }
    });
  }

  onReturn(): void {
    this.router.navigate(['/loginCreateNewAffiliate']);
  }

  openDialog(title: string, message: string) {
    return this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message }
    });
  }

  onCreatePhone(): void {
    const dialogRef = this.dialog.open(DialogCreateComponent, {
      width: '400px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const phones = this.phoneDataSource.data;
        if (phones.includes(result)) {
          this.openDialog('Error', 'Este número de teléfono ya existe')
          .afterClosed()
          .subscribe(() => {
            return;
          });
        }
        this.phoneDataSource.data = [...phones, result];
      }
    });
  }

  onEditPhone(phone: number): void {
    // Prevenir la validación del formulario principal
    event?.preventDefault();
    event?.stopPropagation();
    const dialogRef = this.dialog.open(DialogEditComponent, {
      width: '400px',
      data: { phone }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const phones = this.phoneDataSource.data;
        const index = phones.indexOf(phone);
        if (phones.includes(result.newPhone)) {
          this.openDialog('Error', 'Este número de teléfono ya existe')
          .afterClosed()
          .subscribe(() => {
            return;
          });
        }
        phones[index] = result.newPhone;
        this.phoneDataSource.data = [...phones];
      }
    });
  }

  onDeletePhone(phone: number): void {
    const phones = this.phoneDataSource.data.filter(p => p !== phone);
    this.phoneDataSource.data = phones;
  }

  private validatePhones(): boolean {
    if (this.phoneDataSource.data.length === 0) {
      this.openDialog('Error', 'Debe agregar al menos un teléfono')
        .afterClosed()
        .subscribe(() => {
          return false;
        });
    }
    return true;
  }
}