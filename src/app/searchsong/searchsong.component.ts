import { Component, OnInit } from '@angular/core';
import { GorillazService } from '../gorillaz-service.service';
import axios from 'axios';

@Component({
  selector: 'app-searchsong',
  templateUrl: './searchsong.component.html',
  styleUrls: ['./searchsong.component.scss'],
})
export class SearchsongComponent implements OnInit {
  public songObj: any = [];
  public noSongs: boolean;
  public hasSongs: boolean = true;
  token: any;

  public songlist: any;

  constructor(private gorillazService: GorillazService) {}

  async ngOnInit() {
    await this.gorillazService.getAuth();
    this.gorillazService.getToken().subscribe((elem) => {
      this.token = elem;
    });

    console.log('%c Get out of here ', 'background: #222; color: #bada55');
    console.log(`░░░░░░░░░▀█▄▄░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░░░░▄▄▀▀▀▀▀▀░▀█▄░░░░░░░░░░░░░░░▄▄▄▄░░░░░
    ░░░░██▀▀░░░░░░░▀█▄░░░░░░░░░▄▄▀▀░░██▄▄░░░
    ░▄█▀░░░░░░░▀█▄░░░▀█░░░░░░▄█▀░░░░░░░░▀▀▄░
    ██▄▄░░░░░▄▄░░▀░░░░░█▄░▄░█▀░░░▄▀░░░░▄▀▀▀░
    ░░▄█▀░░░░░░▀░░░░░░░░████░░░░▀░░░░░░░▀▀▄░
    ▄█▄▄░░░▀▀▄░░▄▄█▀▀▀▀▀▀█▄▀▀▀█▄▄░▄▀▀▀░░░▄▄█
    ▀▀░▄▀░░░▄█▀▀█░░░░▄░░░░░▄▀▀▀█▀▀▄▄░░░██░░░
    ░░▀▀▀▀▄▄▀█▄█▀░░█▀░░░░░░░▀▄█▀░░░▀▄██▀▀░░░
    ░░░░░░░█▄▄░░░░░░▀▀░░░░░░░░░░░░▄▄█░░░░░░░
    ░░░░░░░░░█▄▄░░░░░░░░░▄▄▄█░░░░▄█░░░░░░░░░
    ░░░░░░░░░░░█▄▄░░░░░░░░░░░░░░▄█░░░░░░░░░░
    ░░░░░░░░░░░░▀▀▀▀█░░░▄▄▄███▀▀▀░░░░░░░░░░░
    ░░░░░░░░░░▄▄▄▄▀██▄▄▄██▄▄▄░░░░░░░░░░░░░░░
    ░░░░░░░░▄▀░▄▄█▀░░░░░░▄▄▄░▀█▄░░░░░░░░░░░░
    ░░░░░░░░█░░██░░░░░░░░█░░█░░▀█░░░░░░░░░░░
    ░░░░░░░░██▄██░░░░░░░░█▄▄▀▄▄█▀░░░░░░░░░░░
    ░░░░░░░░░░███░░░░░░░░███▀░░░░░░░░░░░░░░░
    ░░░░░░░░░░░▀███▄▄████▀░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░█████████░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░███░░░███░░░░░░░░░░░░░░░░░░░`);
  }

  getSongs(song: string, artist: string) {
    if (!this.gorillazService.getLoading()) return;
    this.gorillazService.setLoading(true);
    this.songObj.length = 0;
    this.gorillazService.getSongs(song, artist).subscribe(
      (elem: any) => {
        this.songlist = elem;
        this.noSongs = false;
        this.searchSongs(this.songlist);
      },
      (error) => this.error(error)
    );
  }

  error(error: any) {
    console.log(error);
    this.hasSongs = false;
    this.gorillazService.setLoading(false);
  }

  extractJSON(inputString) {
    const songsStartIndex = inputString.indexOf('[');
    const songsEndIndex = inputString.lastIndexOf(']') + 1;
    const songsArrayString = inputString.slice(songsStartIndex, songsEndIndex);
    return songsArrayString;
  }

  async searchSongs(songs: any) {
    const songs2 = this.extractJSON(songs);
    this.hasSongs = true;
    await Promise.all(
      JSON.parse(songs2).map((elem) => {
        let url = 'https://api.spotify.com/v1/search';
        let headers = { Authorization: 'Bearer ' + this.token };
        let query = `?q=${elem.song}&type=track&artist=${elem.artist}&limit=1`;
        let ytLink = elem.youtubeLink;
        url = url + query;
        return axios
          .get(url, {
            headers: headers,
          })
          .then((elem) => {
            if (elem.data.tracks.items.length <= 0) {
              this.noSongs = true;
              return;
            }
            this.songObj = [
              ...this.songObj,
              {
                songLink: elem.data.tracks.items[0].external_urls.spotify,
                songName: elem.data.tracks.items[0].name,
                previewUrl: elem.data.tracks.items[0].preview_url,
                images: elem.data.tracks.items[0].album.images,
                artist: elem.data.tracks.items[0].artists[0].name,
                youtubeLink: ytLink,
              },
            ];
            this.gorillazService.setSongList(this.songObj);
            this.gorillazService.setLoading(false);
          });
      })
    );
    // this.songObj.subscribe((elem) => {
    //   console.log(elem);
    // });
  }
}
