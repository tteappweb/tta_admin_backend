import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../../../categoria.model';
import { ApiService } from '../../../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent implements OnInit {

  categoria: Categoria = {
    nombre: '',
    imagen: ''
  }
  constructor(private api: ApiService, private router: Router) { }

  loading: boolean = false;
  collection = 'categorias';

  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });

  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = 'prueba';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;
  public file: File = null;

  ngOnInit(): void {
  }

  async handleCreate() {
    if (!this.file) {
      alert("Selecciona una imagen para la categoría");
      return;
    }
    if (!this.categoria.nombre) {
      alert("Ingresa un nombre para la categoría");
    }
    await this.subirArchivo();
    this.createCategoria();
  }

  async createCategoria() {
    this.loading = true;
    const resp = await this.api.create(this.collection, this.categoria);
    if (resp) {
      this.router.navigate(['/categorias']);
    } else {
      console.log("error creating categoria");
    }
    this.loading = false;
  }


  public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  //Sube el archivo a Cloud Storage
  async subirArchivo() {

    const fileName = new Date().toISOString();
    let referencia = this.api.fileRef(fileName);
    let tarea = await this.api.uploadFile(fileName, this.file);
    this.categoria.imagen = await referencia.getDownloadURL().toPromise();
  }



}
