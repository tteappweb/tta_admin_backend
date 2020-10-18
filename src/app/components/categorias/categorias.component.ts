import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../categoria.model';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {


  categorias: Categoria[];
  collection: string = "categorias";
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData() {
    const resp = await this.api.getAll(this.collection);

    if (resp.size > 0) {
      this.categorias = [];
      resp.forEach((doc) => {
        this.categorias.push({
          id: doc.id,
          nombre: doc.data()['nombre'],
          imagen: doc.data()['imagen'],
        } as Categoria)
      })

    }
  }

  async eliminarCategoria(categoria: Categoria) {
    await this.api.delete(this.collection, categoria.id);
    this.fetchData();
  }


}
