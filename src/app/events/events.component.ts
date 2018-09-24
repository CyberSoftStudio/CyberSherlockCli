import { Component, OnInit } from '@angular/core';
import {TranslatorService} from '../_services';
@Component ({
    selector: 'app-events',
    template: `<div class="container">
        <h3>{{ts.translate('menu.events')}}</h3>
    </div>`
})
export class EventsComponent {
    constructor (
        public ts: TranslatorService
    ) {}
}
