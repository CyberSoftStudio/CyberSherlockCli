import {Component, Input} from '@angular/core';
import {TranslatorService} from '../_services';

@Component({
    selector: 'app-llogin',
    template: `
        <button id="llogin" class="social-btn button-default col-12">
            {{ts.translate('buttons.' + (lin ? 'enter_with' : 'genesis_with'))
        + ts.translate('buttons.llogin')}}
        </button>
    `
})
export class LinkedLoginComponent {
    @Input() lin: boolean;
    constructor (
        public ts: TranslatorService
    ) {}
}
