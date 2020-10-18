import { Component, OnInit } from '@angular/core';
import { Anuncio } from '../../models/anuncio.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent implements OnInit {

  anuncios: Anuncio[] = [];
  collection: string = "anuncios";
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.fetchData();
  }


  async fetchData() {
    const resp = await this.api.getAll(this.collection);

    if (resp.size > 0) {
      this.anuncios = [];
      resp.forEach((doc) => {
        this.anuncios.push({
          id: doc.id,
          imagen: doc.data()['imagen'],
        } as Anuncio)
      })
    }
  }

  async eliminar(item: Anuncio) {
    await this.api.delete(this.collection, item.id);
    this.fetchData();
  }

}
