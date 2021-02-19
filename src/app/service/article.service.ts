import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleModel } from '../models/article.model'
import { map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  url='https://crud-11adf-default-rtdb.firebaseio.com/';
  
  constructor(private http:HttpClient) { }

  crearArticulo(articulo:ArticleModel){
    return  this.http.post(`${this.url}/articles.json`,articulo);
  }
  editarArticulo(articulo:ArticleModel){
    return this.http.put(`${this.url}/articles/${articulo.id}.json`,articulo);
  }
  borrarArticulo(id:string){
    return this.http.delete(`${this.url}/articles/${id}.json`);
  }
  obtenerArticulo( id: string){
    return this.http.get(`${this.url}/articles/${id}.json`);
  }
  obtenerArticulos(){
    
    return this.http.get(`${this.url}/articles.json`).pipe(map(
          this.crearArreglo
    ));
  }
  buscarArticulo(){
    
  }
  private crearArreglo(articlosObj:Object){
    const articulos: ArticleModel[]=[];
    if (articlosObj==null){return[];}
    Object.keys(articlosObj).forEach(key=>{
      const articulo:ArticleModel = articlosObj[key];
      articulo.id=key;
      articulos.push(articulo);
    });
    return articulos.reverse();
  }
}
