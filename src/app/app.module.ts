import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchsongComponent } from './searchsong/searchsong.component';
import { SonglistComponent } from './songlist/songlist.component';
import { SongviewComponent } from './songview/songview.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchsongComponent,
    SonglistComponent,
    SongviewComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
