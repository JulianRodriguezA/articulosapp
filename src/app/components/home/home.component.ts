import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleModel } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/service/article.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  articulos:ArticleModel[];
  url:string = '';
  title:string = '';
  constructor( private router:ActivatedRoute, 
    private articleservice:ArticleService) { 
      this.router.url.subscribe(res=>{
        this.url=res[0].path;
        this.articleservice.obtenerArticulos().subscribe(
          res=>{
            if (this.url==='todos'){
              this.articulos=res;
            }else if(this.url=='home'){
              this.articulos=res;
              this.articulos=this.articulos.slice(0,5);
            }else {
              this.articulos=res;
              this.articulos=this.buscar(this.articulos);
            }
          }
        );
      });
      if (this.url==='todos'){
        this.title='Todos';
      }else if (this.url==='buscar'){
        this.title='Encontrados';
        
      }else {
        this.title='Últimos'
      }
     // console.log(this.articulos)
  }

  ngOnInit(): void {
 
  }
  ngOnDestroy():void{
    console.log('destoy');
    this.articulos = null;
  }
  buscar(articulos:ArticleModel[]){
    let encontrados:ArticleModel[]=[];
    this.router.params.subscribe(
      res=>{
        articulos.forEach(
          articulo=>{
            if(articulo.titulo.toLocaleLowerCase().includes(res.key.toLocaleLowerCase())|| 
            articulo.contenido.toLocaleLowerCase().includes(res.key.toLocaleLowerCase()) || 
            articulo.autor.toLocaleLowerCase().includes(res.key.toLocaleLowerCase())){
              encontrados.push(articulo)
              console.log(articulo.titulo); 
          }
        })
      }
      );
    console.log(encontrados)
    return encontrados;
  }
  
}
