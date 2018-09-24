import {AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {InfoMonitor, ResizeService, TranslatorService} from '../_services';
import {Info, DT} from '../lib/classes';
import {animate, state, style, transition, trigger, useAnimation} from '@angular/animations';
import {anim} from './animations';
import * as $ from 'jquery';

@Component ({
    selector: 'app-lastinfo',
    template: `
        <div id="last-info" [@last]="show"
             class="col-sm-8 offset-sm-2 col-md-6 offset-md-3
                paragraph-{{ + lastInfo.type === 1 ? 'warning'
             : lastInfo.type === 2 ? 'error' : 'info'}}">
            <h6>{{ts.translate(lastInfo.type === 0 ? 'labels.message' :
            lastInfo.type === 1 ? 'labels.warning' : 'labels.error')}}</h6>
            <p>{{lastInfo.info}}</p></div>
    `,
    styles: [`
        #last-info {
            display: block;
            position: fixed;
            left: 0;
            padding: 0;
            opacity: 0;
            z-index: 1201;
        }
        #last-info p {
            font-size: 25px;
        }
    `],
    animations: [
        trigger('last', [
            state('false', style({display: 'none', opacity: 0})),
            state('true', style({display: 'block', opacity: 1})),
            transition('false => true', useAnimation(anim.fadeIn,
                {params: {
                        time: 300
                    }})),
            transition('true => false', useAnimation(anim.fadeOut,
                {params: {
                        time: 300
                    }}))
        ])
    ]
})
export class LastInfoComponent implements OnInit, OnDestroy, AfterViewChecked {
    private _newInfo: Subscription;
    private _timer: any;
    public lastInfo: Info;
    public show: boolean;
    constructor (
        private _rs: ResizeService,
        public im: InfoMonitor,
        public ts: TranslatorService
    ) {
        this.lastInfo = new Info();
    }
    ngOnInit () {
        this._newInfo = this.im.onInfo$.subscribe(data => this
            .showInfo(data));
    }
    ngOnDestroy () {
        if (this._newInfo) {
            this.im.onInfo$.unsubscribe();
        }
    }
    showInfo (data) {
        this.lastInfo = data;
        this.show = true;
        this._timer = null;
        this._timer = setTimeout(() => this.show = false, 7000);
    }
    ngAfterViewChecked () {
        this._setDom();
    }
    _setDom () {
        try {
            const lastInfoDom = document.querySelector('#last-info');
            const h = window.innerHeight - ((lastInfoDom.clientHeight || 102) + 10);
            if ($(lastInfoDom).css('top')
                !== h + window.scrollY) {
                $(lastInfoDom).css('top', h + window.scrollY + 'px');
            }
        } catch (e) {
            this.im.add(e, 2);
        }
    }
}
