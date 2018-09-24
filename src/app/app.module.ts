import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
    ActionMonitor,
    InfoMonitor,
    MediaService,
    PeopleService,
    ResizeService,
    TaskService,
    TranslatorService,
    UserService
} from './_services';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import {HmComponent} from './_hm';
import {RoomComponent} from './_room';
import {AuthorComponent} from './author/author.component';
import {MapGoogleComponent, MapYandexComponent} from './map';
import {HowtoComponent} from './howto';
import {AboutComponent} from './about';
import {EventsComponent} from './events';
import {ContactsComponent} from './contacts';
import {
    DashBoardComponent,
    InfoComponent,
    LastInfoComponent,
    LoginComponent,
    TopNavComponent,
    GoogleLoginComponent,
    FacebookLoginComponent,
    TwitterLoginComponent,
    LinkedLoginComponent, MediaComponent
} from './components' ;
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    AgmCoreModule,
    GoogleMapsAPIWrapper,
    MarkerManager
} from '@agm/core';
import {HttpClientModule} from '@angular/common/http';
import {JsonpModule} from '@angular/http';
import { GmapComponent } from './gmap/gmap.component';

@NgModule({
  declarations: [
    AppComponent,
      MapYandexComponent,
      MapGoogleComponent,
      HowtoComponent,
      AboutComponent,
      EventsComponent,
      ContactsComponent,
      TopNavComponent,
      InfoComponent,
      LastInfoComponent,
      LoginComponent,
      HmComponent,
      RoomComponent,
      AuthorComponent,
      DashBoardComponent,
      GoogleLoginComponent,
      FacebookLoginComponent,
      LinkedLoginComponent,
      TwitterLoginComponent,
      MediaComponent,
      GmapComponent
  ],
  imports: [
    BrowserModule,
      BrowserAnimationsModule,
      routing,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCQqiOB_uS2YEbV5d9vsPUpb4s5VavxulQ'
      }),
      HttpClientModule,
      JsonpModule
  ],
  providers: [
      TranslatorService,
      UserService,
      InfoMonitor,
      ActionMonitor,
      ResizeService,
      TaskService,
      MediaService,
      PeopleService,
      MarkerManager,
      GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
