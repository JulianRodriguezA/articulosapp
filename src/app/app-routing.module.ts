import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'todos',component:HomeComponent},
  {path:'articulo/:id',component:ArticleComponent},
  {path:'crear',component:FormComponent},
  {path:'editar/:id',component:FormComponent},
  {path:'buscar/:key',component:HomeComponent},
  {path:'',component:HomeComponent},
  {path:'**',pathMatch: 'full', redirectTo:'home'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
