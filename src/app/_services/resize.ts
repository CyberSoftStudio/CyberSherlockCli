import { EventManager } from '@angular/platform-browser';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ResizeService {
    public onResize$ = new EventEmitter<{ width: number; height: number; }>();
    public onLoad$ = new EventEmitter<{ width: number; height: number; }>();
    public onOrientationChange$ = new EventEmitter<{ width: number; height: number; }>();
    public onScroll$ = new EventEmitter<{
        scrollY: number;
        scrollX: number;
        height: number;
    }>();

    constructor(eventManager: EventManager) {
        eventManager.addGlobalEventListener('window', 'resize',
            e => this.onResize$.emit({
                width: e.target.innerWidth,
                height: e.target.innerHeight
            }));
        eventManager.addGlobalEventListener('window', 'load',
            e => this.onLoad$.emit({
                width: e.currentTarget.innerWidth,
                height: e.currentTarget.innerHeight
            }));
        eventManager.addGlobalEventListener('window', 'scroll',
            e => this.onScroll$.emit({
                scrollY: e.currentTarget.scrollY,
                scrollX: e.currentTarget.scrollX,
                height: e.currentTarget.innerHeight
            }));
        eventManager.addGlobalEventListener('window', 'orientationchange',
            e => this.onOrientationChange$.emit({
                    width: e.currentTarget.innerWidth,
                    height: e.currentTarget.innerHeight
                })
            );
    }
}
