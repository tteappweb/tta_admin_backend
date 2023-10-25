import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Actions from './../../store/actions';
import { Slide } from '../../models/slide-bienvenida.model';


@Component({
  selector: 'app-slides-bienvenida',
  templateUrl: './slides-bienvenida.component.html',
  styleUrls: ['./slides-bienvenida.component.css']
})
export class SlidesBienvenidaComponent implements OnInit {

  slides: Slide[];
  collection: string = 'slides';
  slide: Observable<Slide>;
  constructor(private api: ApiService, private store: Store) { }

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData() {
    const resp = await this.api.getAll(this.collection);

    if (resp.size > 0) {
      this.slides = [];
      resp.forEach((doc) => {
        this.slides.push({
          id: doc.id,
          titulo: doc.data()['titulo'],
          descripcion: doc.data()['descripcion'],
          numeroSlide: doc.data()['numeroSlide'],
          imagen: doc.data()['imagen'],
        } as Slide);
      });

    }
  }

  async eliminarSlide(slide: Slide) {
    await this.api.delete(this.collection, slide.id);
    this.fetchData();
  }

  editSlide(slide: Slide) {
    this.store.dispatch(new Actions.SetSlide(slide));
  }


}
