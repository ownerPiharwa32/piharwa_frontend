import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { ProductListComponent } from './Pages/product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {path: 'home', component: HomepageComponent },
  {path: 'product', component: ProductListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
