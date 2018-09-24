import { Component, OnInit } from '@angular/core';
import {TranslatorService} from '../_services';
@Component ({
    selector: 'app-howto',
    template: `<div class="container">
        <h3>{{ts.translate('menu.howto')}}</h3>
    </div>`
})
export class HowtoComponent {
    constructor (
        public ts: TranslatorService
    ) {}
}
