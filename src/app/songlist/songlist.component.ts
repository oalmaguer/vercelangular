import { Component, OnInit } from '@angular/core';
import { GorillazService } from '../gorillaz-service.service';

@Component({
  selector: 'app-songlist',
  templateUrl: './songlist.component.html',
  styleUrls: ['./songlist.component.scss'],
})
export class SonglistComponent implements OnInit {
  public songObj: any;
  public isActive: boolean;
  public selectedIndex: any;
  constructor(private gorillazService: GorillazService) {}

  async ngOnInit() {
    await this.gorillazService.getSongList().subscribe((elem) => {
      console.log('Songlist: ', elem);
      if (elem) {
        this.songObj = elem;
      }
    });
  }

  selectSong(song: any, index: any) {
    console.log('Song: ', song);
    // this.isActive = true;
    this.selectedIndex = index;
    this.gorillazService.setSelectedSong(song);
  }
}
