import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticleModel } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/service/article.service';
import {ActivatedRoute, Router} from '@angular/router';
import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  articulo:ArticleModel;
  ruta:string;
  constructor( private articleservice:ArticleService,
    private route:ActivatedRoute,
    private router: Router) {
      route.params.subscribe(
        res=>{
          this.ruta=res.id; 
        });

      console.log(this.ruta)
      if (this.ruta!=null && this.ruta!=undefined ){
        this.articleservice.obtenerArticulo(this.ruta).subscribe(
          (res:any)=>{
            this.articulo=res;
          }
        );
      }else{
        this.articulo={
          titulo:'',
          contenido:'',
          fecha:undefined,
          autor:''
        }
      }
   }

  ngOnInit(): void {
  }
  guardar(f:NgForm){
    console.log(f.value);
    this.articulo=f.value;
    let date =  new Date;
    let fecha = date.toDateString();
    this.articulo.fecha = fecha;
    this.articulo.id=this.ruta;
    if (f.invalid){
      return;
    }
    if (this.ruta!=null && this.ruta!=undefined ){
      this.articleservice.editarArticulo(this.articulo).subscribe();
    }else{
      this.articleservice.crearArticulo(this.articulo).
      subscribe();
    } 
    f.reset();  
    setTimeout(aux=>{
      this.router.navigate(['home']);
    },500)
    
  }
}
