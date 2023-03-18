import { Component } from '@angular/core';
import { GorillazService } from '../gorillaz-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isMobile: boolean = true;
  public isSidebarActive: boolean = false;
  constructor(private gorillazService: GorillazService) {}

  public resetSearch() {
    this.gorillazService.setSearchValue(true);
  }

  public openSidebar() {
    console.log('llega open');
    if (!this.isSidebarActive) {
      this.isSidebarActive = true;
      return;
    }
    this.isSidebarActive = false;
  }
}
