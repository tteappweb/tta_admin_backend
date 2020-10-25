import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AfiliadosComponent } from './components/afiliados/afiliados.component';
import { DetailsComponent } from './components/afiliados/details/details.component';
import { PeticionesComponent } from './components/afiliados/peticiones/peticiones.component';
import { AnunciosFormComponent } from './components/anuncios/anuncios-form/anuncios-form.component';
import { AnunciosComponent } from './components/anuncios/anuncios.component';
import { BlogFormComponent } from './components/blogs/blog-form/blog-form.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { AddCategoriaComponent } from './components/categorias/add-categoria/add-categoria.component';
import { CategoriasComponent } from './components/categorias/categorias.component';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { SlidesBienvenidaComponent } from './components/slides-bienvenida/slides-bienvenida.component';
import { AddSlideComponent } from './components/slides-bienvenida/add-slide/add-slide.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'categorias',
        component: CategoriasComponent
      },
      {
        path: 'categorias/create',
        component: AddCategoriaComponent
      },
      {
        path: 'categorias/edit',
        component: AddCategoriaComponent
      },
      {
        path: 'slides',
        component: SlidesBienvenidaComponent
      },
      {
        path: 'slides/create',
        component: AddSlideComponent
      },
      {
        path: 'slides/edit',
        component: AddSlideComponent
      },
      {
        path: 'blogs',
        component: BlogsComponent
      },
      {
        path: 'blogs/create',
        component: BlogFormComponent
      },
      {
        path: 'anuncios',
        component: AnunciosComponent
      },
      {
        path: 'anuncios/create',
        component: AnunciosFormComponent
      },
      {
        path: 'afiliados',
        component: AfiliadosComponent
      },
      {
        path: 'afiliados/peticiones',
        component: PeticionesComponent
      },
      {
        path: 'afiliados/:id/details',
        component: DetailsComponent
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
