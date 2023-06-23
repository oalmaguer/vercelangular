import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { Buffer } from 'buffer';
import { GorillazService } from './gorillaz-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private gorillazService: GorillazService,
    private httpClient: HttpClient
  ) {}

  title = 'gorillaz';
  artist: any = '' as any;
  songlist: any;
  openSpotifyUrl: any;

  songArray: any;
  songObj: any = [];
  hasSongs: boolean = false;
  public showLoading: boolean;
  public isMobile: boolean = true;

  AUTHORIZE = 'https://developer.spotify.com/authorize';
  showSearch: boolean;
  gif: string = "dkepowkefo";
  str;
  noSongs: any = false;

  ngOnInit() {
    
    
    this.gorillazService.getSearchValue().subscribe((elem) => {
      this.showSearch = elem;
    });
    
    this.gorillazService.getLoading().subscribe((elem) => {
      this.showLoading = elem;
    });

    this.gorillazService.getGif();

    this.gorillazService.getGifUrl().subscribe(elem => {
      this.gif = elem;
    })
  }
}
