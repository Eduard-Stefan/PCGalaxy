import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { MatSelectModule } from '@angular/material/select';
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

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CreateProductComponent,
    EditProductComponent,
    ConfirmDialogComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NotAuthorizedComponent,
    MotherboardsComponent,
    CpusComponent,
    GpusComponent,
    RamComponent,
    StoragesComponent,
    PowerSuppliesComponent,
    PcCasesComponent,
    CoolersComponent,
    FansComponent,
    MonitorsComponent,
    KeyboardsComponent,
    MiceComponent,
    MousePadsComponent,
    HeadsetsComponent,
    SearchComponent,
    ViewProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMatTimepickerModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
