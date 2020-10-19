import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Afiliado } from '../models/afiliado.model';
import { Anuncio } from '../models/anuncio.model';
import { Blog } from '../models/blog.model';
import { Categoria } from '../models/category.model';

type DataInput = Categoria | Blog | Anuncio | Afiliado | Object;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private api: AngularFirestore, private storage: AngularFireStorage) { }

  async getAll(collection: string) {
    return await this.api.collection(collection).get().toPromise();
  }

  async getOne(collection: string, id: string) {
    return await this.api.collection(collection).doc(id).get().toPromise();
  }

  async create(collection: string, data: DataInput) {
    try {
      await this.api.collection(collection).add(data);
      return true;
    } catch (error) {
      return false;
    }
  }

  async delete(collection: string, id: string) {
    try {
      await this.api.collection(collection).doc(id).delete();
      return true;
    } catch (error) {
      return false;
    }
  }

  async update(collection: string, id: string, data: DataInput) {
    return await this.api.collection(collection).doc(id).update(data);
  }

  public uploadFile(fileName: string, data: DataInput) {
    return this.storage.upload(fileName, data);
  }

  public fileRef(fileName: string) {
    return this.storage.ref(fileName);
  }

  async peticionesAfiliados() {
    return await this.api.collection('afiliados', ref => ref.where('aprobado', '==', false)).get().toPromise();
  }

  async afiliadosActivos() {
    return await this.api.collection('afiliados', ref => ref.where('aprobado', '==', true)).get().toPromise();
  }

}
