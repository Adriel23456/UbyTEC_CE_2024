import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { BusinessAssociate, BusinessAssociateService } from '../../../Services/BusinessAssociate/business-associate.service';
import { ClientService } from '../../../Services/Client/client.service';
import { PrincipalService } from '../../../Services/Principal/principal.service';

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
  displayedColumns: string[] = ['position', 'BusinessName', 'businessTypeName', 'Direction', 'Comprar?'];
  dataSource = new MatTableDataSource<BusinessAssociate>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private principalService: PrincipalService,
    private clientService: ClientService,
    private businessAssociateService: BusinessAssociateService,
    private router: Router
  ) {}

  private getProximityOrder(business: BusinessAssociate, clientLocation: { Province: string, Canton: string, District: string }): number {
    if (business.Province === clientLocation.Province && 
        business.Canton === clientLocation.Canton && 
        business.District === clientLocation.District) return 1;
    if (business.Canton === clientLocation.Canton && 
        business.District === clientLocation.District) return 2;
    if (business.Canton === clientLocation.Canton) return 3;
    if (business.Province === clientLocation.Province) return 4;
    return 5;
  }

  private loadBusinesses(filter: string = '') {
    const currentClient = this.clientService.currentClientValue;
    if (!currentClient) return;

    if (filter === '') {
      this.businessAssociateService.getAll().subscribe(businesses => {
        // Filtrar negocios aceptados
        const acceptedBusinesses = businesses.filter(b => b.State === "Aceptado");
        
        // Ordenar por proximidad y nombre
        const sortedBusinesses = acceptedBusinesses.sort((a, b) => {
          const orderA = this.getProximityOrder(a, currentClient);
          const orderB = this.getProximityOrder(b, currentClient);
          
          if (orderA !== orderB) return orderA - orderB;
          return a.BusinessName.localeCompare(b.BusinessName);
        });

        this.dataSource.data = sortedBusinesses;
        this.dataSource.paginator = this.paginator;
      });
    } else {
      this.principalService.getBusinessesByFilterAndClientLocation(currentClient.Id, filter)
        .subscribe(businesses => {
          this.dataSource.data = businesses;
          this.dataSource.paginator = this.paginator;
        });
    }
  }

  ngAfterViewInit() {
    const currentClient = this.clientService.currentClientValue;
    if (!currentClient) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadBusinesses();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.loadBusinesses(filterValue.trim().toLowerCase());
  }

  navigateToShop(business: BusinessAssociate) {
    const currentClient = this.clientService.currentClientValue;
    if (!currentClient) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/sidenavClient/shop-in-busines', business.Legal_Id]);
  }
}