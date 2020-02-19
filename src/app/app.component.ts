import {Component, OnInit} from '@angular/core';
import {CocktailService} from '../Service/cocktail.service';
import {Category} from '../models/Category';
import * as $ from 'jquery';
import {FilterList} from '../models/FilterList';
import {NgxSpinnerService} from 'ngx-spinner';
import {AngularFaviconService} from 'angular-favicon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  category: Category = new Category();
  faviconUrl = 'https://f1.pngfuel.com/png/167/720/1017/heart-emoji-juice-drink-cocktail-orange-drink-nonalcoholic-drink-' +
    'food-heart-frame-png-clip-art.png';
  cocktailList = new FilterList();
  count = 1;
  endMsg = '';
  constructor(private cocktailService: CocktailService,
              private spinner: NgxSpinnerService,
              private ngxFavicon: AngularFaviconService) {}
   ngOnInit() {
    this.ngxFavicon.setFavicon(this.faviconUrl);
    this.spinner.show();
    this.cocktailService.getListCategory().subscribe((list) => {
      this.category = list;
      setTimeout(() => {
        this.getCocktailByFilter();
      }, 1000);
    }, error => {
      this.spinner.hide();
      console.log(error);
    });
  }

  onScroll() {
    this.count++;
    this.getCocktailByFilter();
  }
  getCocktailByFilter() {
   const name = $('[name = \'checkboxes\']');
   if (this.count < name.length) {
     if (name[this.count].checked !== false && name[this.count].value !== undefined) {
       console.log(name[this.count].value);
       this.cocktailService.getListByFilter(name[this.count].value).subscribe((res) => {
         this.cocktailList.filters.push({filterName: name[this.count].value, cocktails: res});
         this.spinner.hide();
       }, error => {
         this.spinner.hide();
         console.log(error);
       });
     } else {
       this.count++;
       console.log('recus');
       this.getCocktailByFilter();
     }
   } else {
     this.endMsg = 'End of list!';
     this.spinner.hide();
     console.log('end');
      }
  }

  applyFilters() {
    this.spinner.show();
    this.cocktailList = new FilterList();
    this.count = 1;
    this.getCocktailByFilter();
  }
}
