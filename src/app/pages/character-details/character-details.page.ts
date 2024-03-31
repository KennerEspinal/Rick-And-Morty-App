import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { addIcons } from 'ionicons';
import { locationOutline, videocamOutline, chevronDown } from 'ionicons/icons';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.page.html',
  styleUrls: ['./character-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class CharacterDetailsPage implements OnInit {

  characterId: string = '';
  character = null as any;
  episodes: any[] = [];

  #activatedRoute = inject(ActivatedRoute);
  #rickAndMortyService = inject(RickAndMortyService);

  constructor() {
    addIcons({ locationOutline, videocamOutline, chevronDown });

    this.characterId = this.#activatedRoute.snapshot.paramMap.get('id') as string;
  }

  ngOnInit() {
    this.getCharacter();
  }

  ionViewWillEnter() {
    this.getCharacter();
  }

  getCharacter(event?: any) {
    this.#rickAndMortyService.getCharacterById(this.characterId).subscribe({
      next: (response: any) => {
        this.character = response;
        this.getEpisodes();
      },
      error: (error: any) => {
      },
    });
  }

  getEpisodes(event?: any) {
    for (let url of this.character.episode) {

      this.#rickAndMortyService.getByUrl(url).subscribe({
        next: (response: any) => {
          this.episodes.push(response);
        },
        error: (error: any) => {
        },
      });
    }
  }


}
