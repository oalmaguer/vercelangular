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
  public playIndex: any;
  public isPlaying: boolean = false;
  constructor(private gorillazService: GorillazService) {}

  async ngOnInit() {
    await this.gorillazService.getSongList().subscribe((elem) => {
      if (elem) {
        this.songObj = elem;
      }
    });
  }

  selectSong(song: any, index: any) {
    // this.isActive = true;
    this.selectedIndex = index;
    this.gorillazService.setSelectedSong(song);
  }

  playSong(song: any, index: any) {
    let audioPlayer = <HTMLVideoElement>(
      document.getElementById(`audioSong${index}`)
    );
    // this.gorillazService.setSelectedSong(song);

    if (this.isPlaying) {
      this.isPlaying = !this.isPlaying;
      audioPlayer.pause();
      this.playIndex = 100;

      return;
    }
    this.playIndex = index;
    audioPlayer.play();
    this.isPlaying = true;
  }
}
