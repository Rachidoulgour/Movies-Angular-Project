import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  // state = {
  //   auth: null
  // }
  

  constructor(private http: HttpClient) { }
  
  getMovies():Observable<any>{
    return this.http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=47ce42f4cd0ee261f3474783a3783198');
  }
  // login(user) {

  //   this.state.auth = user;

  // }
  getMovieByGenres(genres:any[]):Observable<object>{
    let url:string=`https://api.themoviedb.org/3/discover/movie?api_key=47ce42f4cd0ee261f3474783a3783198&sort_by=popularity.desc&with_genres=`
    for (const genre of genres) {
      url=url+genre.id+',';
    }
    
    return this.http.get(url)
}
buscarPelicula(texto: string) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${texto}&sort_by=popularity.desc&api_key=47ce42f4cd0ee261f3474783a3783198`;
  return this.http.get(url).pipe(
    map((res: any) => res)
  );

}
}
