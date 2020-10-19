import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Afiliado } from '../../../models/afiliado.model';
import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  id: string;
  afiliado: Afiliado;
  isLoading = true;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.fetchData();
    });

  }

  async fetchData() {
    this.isLoading = true;
    const resp = await this.api.getOne('afiliados', this.id);
    if (resp.exists) {
      this.afiliado = {
        id: resp.id,
        nombre: resp.data()['nombre'],
        fotos: resp.data()['fotos'],
        aprobado: resp.data()['aprobado'],
        img: resp.data()['img'],
        categoria: resp.data()['categoria'],
        latitud: resp.data()['latitud'],
        longitud: resp.data()['longitud'],
        ubicacion: resp.data()['ubicacion'],
        rating: resp.data()['ubicacion'],
        total: resp.data()['total'],
        rfc: resp.data()['rfc'],
        telefono: resp.data()['telefono'],
        puntos: resp.data()['puntos'],
      }
    }
    this.isLoading = false;
  }

  async switchAprobar() {
    const data = {
      aprobado: !this.afiliado.aprobado
    }
    await this.api.update('afiliados', this.afiliado.id, data);
    this.fetchData();
  }




}
