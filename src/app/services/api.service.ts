import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Blog } from '../models/blog.model';
import { Categoria } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private api: AngularFirestore, private storage: AngularFireStorage) { }

  async getAll(collection: string) {
    return await this.api.collection(collection).get().toPromise();
  }

  getOne(collection: string, id: string) {

  }

  async create(collection: string, data: Categoria | Blog) {
    console.log("Crear la categoria", data);
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

  public uploadFile(fileName: string, data: any) {
    return this.storage.upload(fileName, data);
  }

  public fileRef(fileName: string) {
    return this.storage.ref(fileName);
  }

}
