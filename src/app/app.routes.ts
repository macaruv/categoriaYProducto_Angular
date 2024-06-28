import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListaComponent  } from './components/lista/lista.component';
import { CategoriaFormComponent } from './components/categoria-form/categoria-form.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lista', component: ListaComponent },
  { path: 'categorias', component: ListaComponent },
  { path: 'productos', component: ListaComponent },
  { path: 'categoria-form', component: CategoriaFormComponent },
  { path: 'producto-form', component: ProductoFormComponent },
];
