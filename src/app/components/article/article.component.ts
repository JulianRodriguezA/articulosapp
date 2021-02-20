import { Component, OnInit } from '@angular/core';
import { ArticleModel } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/service/article.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articulo:ArticleModel;
  constructor(private route:ActivatedRoute, 
    private articleservice:ArticleService,
    private router: Router,
    ) { 
      route.params.subscribe(
        resp=>{
          this.articleservice.obtenerArticulo(resp.id)
          .subscribe(
            (res:any)=>{
              console.log(res)
              this.articulo=res;
              this.articulo.id=resp.id;
            }
            )}
      )
    }

  ngOnInit(): void {
  }
  borrar(){
    this.articleservice.borrarArticulo(this.articulo.id).subscribe(
      res=>{
        Swal.fire({
          icon: 'success',
          title: 'Borrado',
          text: 'El articulo se ha borrado',
        })
        this.router.navigate(['home']);
      }
    );
  }
  editar(){
    this.router.navigate(['editar',this.articulo.id]);
  }
}
