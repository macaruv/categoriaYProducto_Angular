import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto/producto.service';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { Producto } from '../../models/producto.model';
import { Categoria } from '../../models/categoria.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProductoFormComponent implements OnInit {
  producto: Producto = {} as Producto;
  categorias: Categoria[] = [];
  categoriaId: number | null = null;
  buscarIdProducto: number | null = null;
  message: string | null = null;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      data => {
        this.categorias = data;
      },
      error => {
        console.error('Error fetching categorias:', error);
      }
    );
  }

  onSubmit() {
    if (this.categoriaId !== null) {
      this.producto.idCategoria = this.categoriaId;
    }

    if (this.producto.idProducto) {
      this.productoService.updateProducto(this.producto.idProducto, this.producto).subscribe(response => {
        console.log('Producto actualizado', response);
        this.message = 'Producto actualizado con éxito';
        this.clearFields();
      }, error => {
        console.error('Error actualizando el producto', error);
        this.message = 'Error actualizando el producto';
      });
    } else {
      this.productoService.createProducto(this.producto).subscribe(response => {
        console.log('Producto creado', response);
        this.message = 'Producto creado con éxito';
        this.clearFields();
      }, error => {
        console.error('Error creando el producto', error);
        this.message = 'Error creando el producto';
      });
    }
  }

  onDelete() {
    if (this.producto.idProducto !== null) {
      this.productoService.deleteProducto(this.producto.idProducto).subscribe(response => {
        console.log('Producto eliminado', response);
        this.message = 'Producto eliminado con éxito';
        this.clearFields();
      }, error => {
        console.error('Error eliminando el producto', error);
        this.message = 'Error eliminando el producto';
      });
    } else {
      this.message = 'ID de producto no válido';
    }
  }

  loadProducto() {
    if (this.buscarIdProducto) {
      this.productoService.getProducto(this.buscarIdProducto).subscribe(response => {
        if (response) {
          this.producto = response;
          this.categoriaId = response.idCategoria;
          console.log('Producto cargado', response);
        } else {
          this.clearFields();
          this.message = 'Producto no encontrado';
        }
      }, error => {
        console.error('Error cargando el producto', error);
        this.clearFields();
        this.message = 'Error cargando el producto';
      });
    } else {
      this.message = 'ID de producto no válido';
    }
  }

  clearFields() {
    this.producto = {} as Producto;
    this.categoriaId = null;
    this.buscarIdProducto = null;
    this.message = null;
  }
}
