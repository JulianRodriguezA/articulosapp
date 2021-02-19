import { Component, OnInit, Input } from '@angular/core';
import { ArticleModel } from 'src/app/models/article.model';
import {Router} from'@angular/router';
@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent implements OnInit {
  @Input() article:ArticleModel;

  constructor( private router:Router) { }

  ngOnInit(): void {
  }
  verArticulo(article:ArticleModel){
    this.router.navigate(['/articulo',article.id]);
  }
}
