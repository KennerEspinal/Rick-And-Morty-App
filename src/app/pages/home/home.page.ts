import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class HomePage implements OnInit {

  characters: any[] = [];
  params = {} as any;

  #rickAndMortyService = inject(RickAndMortyService);

  ngOnInit() {
    this.params.page = 0;
    this.getCharacters();
  }

  getCharacters(event?: any) {
    this.params.page++;
    this.#rickAndMortyService.getCharacters(this.params).subscribe({
      next: (response: any) => {
        this.characters.push(...response.results);   
        if(event) event.target.complete();     
      },
      error: (error: any) => {
        if(event) event.target.complete();    
      },
    });
  }

  searchCharacters() {
    this.params.page = 1;
    this.#rickAndMortyService.getCharacters(this.params).subscribe({
      next: (response: any) => {
        this.characters = response.results;
      },
      error: (error: any) => {
      },
    });
  }
}
