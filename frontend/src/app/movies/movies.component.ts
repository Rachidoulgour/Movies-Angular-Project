import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MoviesService} from '../movies.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit{
  movies: object[];
  
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  genreCtrl = new FormControl();
  filteredGenres: Observable<string[]>;
  genres: any[]=[];
  allGenres: any[] = [{
    id: 28,
    name: "Acción"
    },
    {
    id: 12,
    name: "Aventura"
    },
    {
    id: 16,
    name: "Animación"
    },
    {
    id: 35,
    name: "Comedia"
    },
    {
    id: 80,
    name: "Crimen"
    },
    {
    id: 99,
    name: "Documental"
    },
    {
    id: 18,
    name: "Drama"
    },
    {
    id: 10751,
    name: "Familia"
    },
    {
    id: 14,
    name: "Fantasía"
    },
    {
    id: 36,
    name: "Historia"
    },
    {
    id: 27,
    name: "Terror"
    },
    {
    id: 10402,
    name: "Música"
    },
    {
    id: 9648,
    name: "Misterio"
    },
    {
    id: 10749,
    name: "Romance"
    },
    {
    id: 878,
    name: "Ciencia ficción"
    },
    {
    id: 10770,
    name: "Película de TV"
    },
    {
    id: 53,
    name: "Suspense"
    },
    {
    id: 10752,
    name: "Bélica"
    },
    {
    id: 37,
    name: "Western"
    }];
    

  @ViewChild('genreInput', {static: false}) genreInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  constructor(private moviesService:MoviesService) {this.filteredGenres = this.genreCtrl.valueChanges.pipe(
    startWith(null),
    map((genre: string | null) => genre ? this._filter(genre) : this.allGenres.slice()));
}

  ngOnInit() {
    this.moviesService.getMovies().subscribe(res=>this.movies=res.results)
  }
  add(event: MatChipInputEvent): void {
    // Add genre only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      // Add our genre
      if ((value || '').trim()) {
        this.genres.push({id:Math.random(),
                          name:value.trim()});
        console.log(this.genres)                 
      }

      // console.log(value)
      // Reset the input value
      if (input) {
        input.value = '';
      }
      
      this.moviesService.getMovieByGenres(this.genres)
      .subscribe(res=>this.movies=res["results"],
      error=>console.log(error))
      this.genreCtrl.setValue(null);
    }
  }

  remove(genre: string): void {
    const index = this.genres.indexOf(genre);

    if (index >= 0) {
      this.genres.splice(index, 1);
    }
    
    this.moviesService.getMovieByGenres(this.genres)
    .subscribe(res=>this.movies=res["results"],
    error=>console.log(error))
  }
  
  selected(event: MatAutocompleteSelectedEvent): void {
    this.genres.push(event.option.value);
    this.genreInput.nativeElement.value = '';
    this.genreCtrl.setValue(null);
  }

  private _filter(value: any): string[] {
    // const filterValue = value.toLowerCase();
    
    return this.allGenres.filter(genre => genre.id === value.id);
    
  }
  
  

}
