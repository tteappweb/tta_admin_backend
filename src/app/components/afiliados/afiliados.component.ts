import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Afiliado } from '../../models/afiliado.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrls: ['./afiliados.component.css']
})
export class AfiliadosComponent implements OnInit {


  afiliados: Afiliado[];
  collection: string = "afiliados";
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData() {
    const resp = await this.api.afiliadosActivos();

    if (resp.size > 0) {
      this.afiliados = [];
      resp.forEach((doc) => {
        this.afiliados.push({
          id: doc.id,
          nombre: doc.data()['nombre'],
          img: doc.data()['img'],
          categoria: doc.data()['categoria'],
          rating: doc.data()['rating'],
          ubicacion: doc.data()['ubicacion'],
        } as Afiliado)
      })

    }
  }

  async desactivar(afiliado: Afiliado) {
    if (confirm(`¿Estás seguro de desactivar la afiliación '${afiliado.nombre}'?`)) {
      const data = {
        aprobado: false
      };
      await this.api.update(this.collection, afiliado.id, data);
      this.afiliados = this.afiliados.filter(a => a.id != afiliado.id);
    }

  }

  async eliminarAfiliado(afiliado: Afiliado) {
    if (confirm(`¿Estás seguro de eliminar la afiliación '${afiliado.nombre}'?`)) {
      await this.api.delete(this.collection, afiliado.id);
      this.afiliados = this.afiliados.filter(a => a.id != afiliado.id);
    }
  }


}
