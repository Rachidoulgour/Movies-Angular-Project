import { Component, OnInit } from '@angular/core';

import { MoviesService } from '../movies.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public busqueda = false;
  public movies: any[] = [];
  constructor(public pS: MoviesService) { }



  ngOnInit() {

  }


  buscar(text: string) {
    console.log(text);
    this.movies = [];
    this.busqueda = false;
    this.pS.buscarPelicula(text)
      .subscribe(data => {
        console.log(data);
        this.movies = data.results;
        this.busqueda = true;
      });
  }

}