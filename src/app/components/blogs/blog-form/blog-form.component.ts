import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../../../models/blog.model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {

  blog: Blog = {
    titulo: '',
    fecha: '',
    descripcion: '',
    link: ''
  }
  loading = false;

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  async handleCreate() {
    console.log(this.blog);
    //return;
    this.loading = true;
    const resp = await this.api.create('blogs', this.blog);
    if (resp) {
      this.router.navigate(['/blogs']);
    } else {
    }
    this.loading = false;

  }

}
