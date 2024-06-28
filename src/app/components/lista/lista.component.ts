import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { ProductoService } from '../../services/producto/producto.service';
import { Categoria } from '../../models/categoria.model';
import { Producto } from '../../models/producto.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ListaComponent implements OnInit {
  categorias: Categoria[] = [];
  productos: Producto[] = [];

  constructor(private categoriaService: CategoriaService, private productoService: ProductoService) {}

  ngOnInit(): void {
    this.loadCategorias();
    this.loadProductos();
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

  loadProductos(): void {
    this.productoService.getProductos().subscribe(
      data => {
        this.productos = data;
      },
      error => {
        console.error('Error fetching productos:', error);
      }
    );
  }
}
