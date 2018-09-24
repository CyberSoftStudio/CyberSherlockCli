import {Component, Input} from '@angular/core';
import {TranslatorService} from '../_services';

@Component({
    selector: 'app-tlogin',
    template: `
        <button id="tlogin" class="social-btn button-default col-12">
            {{ts.translate('buttons.' + (lin ? 'enter_with' : 'genesis_with'))
        + ts.translate('buttons.tlogin')}}
        </button>
    `
})
export class TwitterLoginComponent {
    @Input() lin: boolean;
    constructor (
        public ts: TranslatorService
    ) {}
}
