import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class ActionMonitor {
    public onAction$ = new EventEmitter<{
        object: string,
        action: string
    }>();
    constructor () {}
}
