import { Component, OnInit } from '@angular/core';
import { GorillazService } from '../gorillaz-service.service';
import axios from 'Axios';

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
  }

  getSongs(song: string, artist: string) {
    console.log('si');
    console.log(this.gorillazService.getLoading());
    if (!this.gorillazService.getLoading()) return;
    this.gorillazService.setLoading(true);
    this.songObj.length = 0;
    this.gorillazService.getSongs(song, artist).subscribe((elem: any) => {
      if (
        elem.message.content.trim() == 'No' ||
        elem.message.content.trim() == 'No.'
      ) {
        this.noSongs = true;
        return;
      }
      this.songlist = elem.message.content;
      // let str = this.songlist.split('\n');
      // this.songlist = str;
      this.noSongs = false;
      console.log(this.songlist);
      this.searchSongs(this.songlist);
    });
  }

  async searchSongs(songs: any) {
    this.hasSongs = true;

    // this.songArray = songs.filter((elem) => elem != '');
    let jsonSongs;
    let jsonSongs2;
    // try {
    // } catch (e) {
    //   console.log('Errorsao: ', e);
    //   return;
    // }
    let newjs;
    try {
      jsonSongs2 = JSON.stringify(songs.trim());
      jsonSongs = JSON.parse(jsonSongs2);
      this.hasSongs = true;
    } catch (e) {
      this.hasSongs = false;
      this.gorillazService.setLoading(false);
      console.log('Errorsao: ', e);
      console.log('hasta aqui');
      return;
    }
    console.log();
    newjs = JSON.parse(jsonSongs);
    console.log(newjs);
    console.log(newjs.data);
    await Promise.all(
      newjs.data.map((elem) => {
        let url = 'https://api.spotify.com/v1/search';
        let headers = { Authorization: 'Bearer ' + this.token };
        let query = `?q=${elem.songName}&type=track&artist=${elem.songArtist}&limit=1`;
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