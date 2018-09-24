import { Routes, RouterModule } from '@angular/router';
import { HmComponent } from './_hm';
import { RoomComponent } from './_room';
import { MapGoogleComponent } from './map';
import { HowtoComponent } from './howto';
import { AboutComponent } from './about';
import { ContactsComponent } from './contacts';
import { EventsComponent } from './events';
import {AuthorComponent} from './author/author.component';

const appRoutes: Routes = [
    { path: 'author', component: AuthorComponent },
    { path: 'hm', component: HmComponent },
    { path: 'map', component: MapGoogleComponent },
    { path: 'room', component: RoomComponent },
    { path: 'about', component: AboutComponent },
    { path: 'howto', component: HowtoComponent },
    { path: 'events', component: EventsComponent },
    { path: 'contacts', component: ContactsComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'map' },
    { path: 'enter', redirectTo: 'map' },
    { path: 'exit', redirectTo: 'map' },
];

export const routing = RouterModule.forRoot(appRoutes);
