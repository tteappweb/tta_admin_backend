import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { Categoria } from '../../models/category.model';
import { Observable } from 'rxjs';
import * as Actions from './../../store/actions';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {


  categorias: Categoria[];
  collection: string = "categorias";
  categoria: Observable<Categoria>;
  constructor(private api: ApiService, private store: Store) { }

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

  editCategory(category: Categoria) {
    this.store.dispatch(new Actions.SetCategory(category));
  }


}
