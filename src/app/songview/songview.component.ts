import { Component, OnInit } from '@angular/core';
import { GorillazService } from '../gorillaz-service.service';

@Component({
  selector: 'app-songview',
  templateUrl: './songview.component.html',
  styleUrls: ['./songview.component.scss'],
})
export class SongviewComponent implements OnInit {
  public selectedSong: any;
  constructor(private gorillazService: GorillazService) {}

  async ngOnInit() {
    await this.gorillazService.getSelectedSong().subscribe((elem) => {
      console.log('selected: ', elem);
      if (elem) {
        this.selectedSong = elem;
      }
    });
  }
}
