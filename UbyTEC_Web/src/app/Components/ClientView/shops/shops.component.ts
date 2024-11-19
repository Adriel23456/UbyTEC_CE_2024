import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs';
import { BusinessAssociate, BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';
import { BusinessTypeService } from '../../../Services/BusinessType/business-type.service';
import { ClientService } from '../../../Services/Client/client.service';
import { CartService } from '../../../Services/Cart/cart.service';

@Component({
  selector: 'app-shops',
  standalone: true,
  imports: [
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.css'
})
export class ShopsComponent {
  businessAssociate: BusinessAssociate[] = [];
  displayedColumns: string[] = ['position', 'BusinessName', 'businessTypeName', 'Direction', 'Comprar?'];
  dataSource = new MatTableDataSource<BusinessAssociate>();
  currentClientCanton: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private businessAService: BusinessAssociateService,
    private businessTService: BusinessTypeService,
    private clientService: ClientService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngAfterViewInit() {
    this.clientService.getAll().subscribe((clients) => {
      const currentClient = this.clientService.currentClientValue;
      if (currentClient) {
        this.currentClientCanton = currentClient.Canton;
      }

      this.businessAService.getAll().subscribe((data) => {
        const filteredData = data.filter((business) => business.Canton === this.currentClientCanton);

        const businessTypeObservables = filteredData.map((business) =>
          this.businessTService.getById(business.BusinessType_Identification).pipe(
            map((businessType) => ({
              ...business,
              businessTypeName: businessType.Name  
            }))
          )
        );
        

        forkJoin(businessTypeObservables).subscribe((updatedData) => {
          this.dataSource.data = updatedData;
          this.dataSource.paginator = this.paginator;
        });
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigateToShop(business: BusinessAssociate) {
    const currentClient = this.clientService.currentClientValue;
    if (currentClient) {
      const newCart = {
        Client_Id: currentClient.Id 
      };
      this.cartService.create(newCart).subscribe(() => {
        this.router.navigate(['/sidenavClient/shop-in-busines', business.Legal_Id]);
      });
    }
  }
}
