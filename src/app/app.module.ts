import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ListaComponent } from './components/lista/lista.component'; // Importa ListaComponent
import { CategoriaFormComponent } from './components/categoria-form/categoria-form.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lista', component: ListaComponent },
  { path: 'categorias', component: ListaComponent },
  { path: 'productos', component: ListaComponent },
  { path: 'categoria-form', component: CategoriaFormComponent },
  { path: 'producto-form', component: ProductoFormComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ListaComponent,
    CategoriaFormComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
