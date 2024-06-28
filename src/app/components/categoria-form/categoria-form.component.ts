import { Component } from '@angular/core';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { Categoria } from '../../models/categoria.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CategoriaFormComponent {
  categoria: Categoria = { descripcionCategoria: '', nombreCategoria: '' };
  categoriaId: number | null = null;
  searchId: number | null = null;
  message: string | null = null;

  constructor(private categoriaService: CategoriaService) {}

  onSubmit() {
    console.log('Datos de la categoría enviados:', this.categoria);
    if (this.categoria.idCategoria) {
      this.categoriaService.updateCategoria(this.categoria.idCategoria, this.categoria).subscribe(response => {
        console.log('Categoría actualizada', response);
        this.message = 'Categoría actualizada exitosamente.';
        this.categoria = { descripcionCategoria: '', nombreCategoria: '' };
        this.categoriaId = null;
      }, error => {
        this.message = 'Error actualizando la categoría.';
        console.error(error);
      });
    } else {
      this.categoriaService.createCategoria(this.categoria).subscribe(response => {
        console.log('Categoría creada', response);
        this.message = 'Categoría creada exitosamente.';
        this.categoria = { descripcionCategoria: '', nombreCategoria: '' };
      }, error => {
        this.message = 'Error creando la categoría.';
        console.error(error);
      });
    }
  }

  onDelete() {
    if (this.categoriaId !== null && this.categoriaId > 0) {
      this.categoriaService.deleteCategoria(this.categoriaId).subscribe(response => {
        console.log('Categoría y sus productos eliminados', response);
        this.message = 'Categoría y sus productos eliminados exitosamente.';
        this.categoriaId = null;
      }, error => {
        this.message = 'Error eliminando la categoría.';
        console.error(error);
      });
    } else {
      this.message = 'ID de categoría inválido.';
    }
  }

  loadCategoria() {
    if (this.searchId !== null && this.searchId > 0) {
      this.categoriaService.getCategoria(this.searchId).subscribe(response => {
        if (response) {
          this.categoria = response;
          this.categoriaId = this.searchId;
          this.message = null;
        } else {
          this.message = 'Categoría no encontrada.';
        }
      }, error => {
        this.message = 'Categoría no encontrada.';
        console.error(error);
      });
    } else {
      this.message = 'ID de categoría inválido.';
    }
  }

  clearFields() {
    this.categoria = { descripcionCategoria: '', nombreCategoria: '' };
  }
}
