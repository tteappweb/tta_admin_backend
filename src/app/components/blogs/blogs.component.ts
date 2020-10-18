import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/blog.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  blogs: Blog[] = [];
  collection: string = "blogs";
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.fetchData();
  }


  async fetchData() {
    const resp = await this.api.getAll(this.collection);

    if (resp.size > 0) {
      this.blogs = [];
      resp.forEach((doc) => {
        this.blogs.push({
          id: doc.id,
          titulo: doc.data()['titulo'],
          descripcion: doc.data()['descripcion'],
          fecha: doc.data()['fecha'],
          link: doc.data()['link'],
        } as Blog)
      })
    }
  }

  async eliminar(blog: Blog) {
    await this.api.delete(this.collection, blog.id);
    this.fetchData();
  }





}
