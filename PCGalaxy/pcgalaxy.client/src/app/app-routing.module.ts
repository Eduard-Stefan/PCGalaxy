import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './guards/admin.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { MotherboardsComponent } from './categories/motherboards/motherboards.component';
import { CpusComponent } from './categories/cpus/cpus.component';
import { GpusComponent } from './categories/gpus/gpus.component';
import { RamComponent } from './categories/ram/ram.component';
import { StoragesComponent } from './categories/storages/storages.component';
import { PowerSuppliesComponent } from './categories/power-supplies/power-supplies.component';
import { PcCasesComponent } from './categories/pc-cases/pc-cases.component';
import { CoolersComponent } from './categories/coolers/coolers.component';
import { FansComponent } from './categories/fans/fans.component';
import { MonitorsComponent } from './categories/monitors/monitors.component';
import { KeyboardsComponent } from './categories/keyboards/keyboards.component';
import { MiceComponent } from './categories/mice/mice.component';
import { MousePadsComponent } from './categories/mouse-pads/mouse-pads.component';
import { HeadsetsComponent } from './categories/headsets/headsets.component';
import { SearchComponent } from './search/search.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin/products', component: ProductsComponent, canActivate: [AdminGuard] },
  { path: 'product/:id', component: ViewProductComponent },
  { path: 'motherboards', component: MotherboardsComponent },
  { path: 'cpus', component: CpusComponent },
  { path: 'gpus', component: GpusComponent },
  { path: 'ram', component: RamComponent },
  { path: 'storages', component: StoragesComponent },
  { path: 'power-supplies', component: PowerSuppliesComponent },
  { path: 'pc-cases', component: PcCasesComponent },
  { path: 'coolers', component: CoolersComponent },
  { path: 'fans', component: FansComponent },
  { path: 'monitors', component: MonitorsComponent },
  { path: 'keyboards', component: KeyboardsComponent },
  { path: 'mice', component: MiceComponent },
  { path: 'mouse-pads', component: MousePadsComponent },
  { path: 'headsets', component: HeadsetsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: 'search', component: SearchComponent },
  { path: 'wishlist', component: WishlistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
