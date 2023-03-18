import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class GorillazService {
  public token = new BehaviorSubject('');
  public token$ = this.token.asObservable();

  public songs = new BehaviorSubject('');
  public songs$ = this.songs.asObservable();

  public showSearch = new BehaviorSubject(true);
  public showSearch$ = this.showSearch.asObservable();

  public showLoading = new BehaviorSubject(false);
  public showLoading$ = this.showLoading.asObservable();

  public selectedSong = new BehaviorSubject('');
  public selectedSong$ = this.selectedSong.asObservable();

  // baseUrl = 'https://vercelback-qmh9gzpqj-oalmaguer.vercel.app';
  // baseUrl = 'http://localhost:3000';
  baseUrl = 'https://vercelback-git-main-oalmaguer.vercel.app';
  constructor(private http: HttpClient) {}

  getSongs(song: string, artist: string) {
    return this.http.post(`${this.baseUrl}/songs`, {
      song: song,
      artist: artist,
    });
  }

  getAuth() {
    this.http
      .post(`${this.baseUrl}/spotify_token`, {
        grant_type: 'client_credentials',
      })
      .subscribe((elem: any) => {
        this.token.next(elem);
        this.setSearchValue(true);
      });
  }

  public getToken() {
    return this.token$;
  }

  public setSongList(data: any) {
    if (data.length > 0) {
      this.setSearchValue(false);
      this.songs.next(data);
      this.setSelectedSong(data[0]);
    } else {
      this.setSearchValue(false);
      this.songs.next(data);
      return;
    }
  }

  public getSongList() {
    return this.songs$;
  }

  public getSearchValue() {
    return this.showSearch$;
  }

  public setSearchValue(data: any) {
    this.showSearch.next(data);
  }

  public getLoading() {
    return this.showLoading$;
  }

  public setLoading(data: any) {
    this.showLoading.next(data);
  }

  public setSelectedSong(data: any) {
    this.selectedSong.next(data);
  }

  public getSelectedSong() {
    return this.selectedSong$;
  }

  public resetSearch() {
    this.setSongList([]);
    this.setSelectedSong([]);
  }
}
