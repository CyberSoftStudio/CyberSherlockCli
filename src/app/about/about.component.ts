import { Component, OnInit } from '@angular/core';
import {TranslatorService} from '../_services';
@Component ({
    selector: 'app-about',
    template: `<div class="container">
        <h3>{{ts.translate('menu.about')}}</h3>
        <app-info></app-info>
    </div>`
})
export class AboutComponent {
    constructor (
        public ts: TranslatorService
    ) {}
}
