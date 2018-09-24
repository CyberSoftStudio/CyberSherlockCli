import {Component, Input} from '@angular/core';
import {TranslatorService} from '../_services';

@Component({
    selector: 'app-flogin',
    template: `
        <button id="flogin" class="social-btn button-default col-12">
            {{ts.translate('buttons.' + (lin ? 'enter_with' : 'genesis_with'))
        + ts.translate('buttons.flogin')}}
        </button>
    `
})
export class FacebookLoginComponent {
    @Input() lin: boolean;
    constructor (
        public ts: TranslatorService
    ) {}
}
