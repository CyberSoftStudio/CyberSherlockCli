import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TranslatorService} from '../_services';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit {
    title = '';
    constructor(private _trans: TranslatorService) {
    }
    setStyles() { }
    responsive() { }
    ngOnInit() {
        this.title = this._trans.translate('room.title');
    }
}
