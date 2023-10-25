import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Anuncio } from '../../../models/anuncio.model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-anuncios-form',
  templateUrl: './anuncios-form.component.html',
  styleUrls: ['./anuncios-form.component.css']
})
export class AnunciosFormComponent implements OnInit {


  constructor(private api: ApiService, private router: Router) {

  }

  loading: boolean = false;
  collection = 'anuncios';

  anuncio: Anuncio = {
    imagen: '',
    link: ''
  }


  public file: File = null;

  ngOnInit(): void {

  }

  async handleCreate() {

    await this.subirArchivo();
    if (!this.anuncio.imagen) {
      alert("No se ha encontrado ningún anuncio para crear");
      return;
    }
    this.createCategoria();
  }

  async createCategoria() {
    this.loading = true;
    const resp = await this.api.create(this.collection, this.anuncio);
    if (resp) {
      this.router.navigate(['/anuncios']);
    }
    this.loading = false;
  }


  public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  //Sube el archivo a Cloud Storage
  async subirArchivo() {

    const fileName = new Date().toISOString();
    let referencia = this.api.fileRef(fileName);
    let tarea = await this.api.uploadFile(fileName, this.file);
    this.anuncio.imagen = await referencia.getDownloadURL().toPromise();
  }
}
