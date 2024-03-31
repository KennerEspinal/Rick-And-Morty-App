import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  #http = inject(HttpClient);

  constructor() { }

  getCharacters(params: any) {
    return this.#http.get(environment.baseUrl + '/character', { params });
  }

  getCharacterById(id: string) {
    return this.#http.get(environment.baseUrl + '/character/' + id);
  }

  getByUrl(url: string){
    return this.#http.get(url);
  }
}
