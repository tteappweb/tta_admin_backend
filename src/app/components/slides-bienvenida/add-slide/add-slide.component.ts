import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Categoria } from '../../../models/category.model';
import { AppState } from '../../../app.state';
import { Slide } from '../../../models/slide-bienvenida.model';
@Component({
  selector: 'app-add-slide',
  templateUrl: './add-slide.component.html',
  styleUrls: ['./add-slide.component.css']
})
export class AddSlideComponent implements OnInit {

  slide: Slide = {
    imagen: null,
    numeroSlide: null
  };
  constructor(private api: ApiService, private router: Router, private store: Store) {

  }

  loading: boolean = false;
  collection = 'slides';



  public file: File = null;

  ngOnInit(): void {

  }

  async handleCreate() {
    if (!this.file) {
      alert("Selecciona una imagen para el slide");
      return;
    }
    if (!this.slide) {
      alert("Ingresa el numero de slide");
    }
    await this.subirArchivo();
    this.createSlide();
  }

  async createSlide() {
    this.loading = true;
    const resp = await this.api.create(this.collection, this.slide);
    if (resp) {
      this.router.navigate(['/slides']);
    } else {
      console.log("error creating slide");
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
    this.slide.imagen = await referencia.getDownloadURL().toPromise();
  }


}
