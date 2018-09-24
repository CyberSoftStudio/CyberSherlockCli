import { Component, OnInit } from '@angular/core';
import {TranslatorService} from '../_services';
@Component ({
    selector: 'app-contacts',
    template: `<div class="container">
        <h3>{{ts.translate('menu.contacts')}}</h3>
    </div>`
})
export class ContactsComponent {
    constructor (
        public ts: TranslatorService
    ) {}
}
