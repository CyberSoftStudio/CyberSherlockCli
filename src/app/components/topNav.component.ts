import {
    ActionMonitor,
    InfoMonitor,
    TranslatorService
} from '../_services';
import {
    AfterViewChecked,
    AfterViewInit,
    Component
} from '@angular/core';
import {config} from '../config';
import {UserService} from '../_services';
import {state, style, transition, trigger, useAnimation} from "@angular/animations";
import {anim} from "./animations";

@Component ({
    selector: 'app-topnav',
    template: `
        <div class="block-absolute-right nav-block">
            <ul class="nav justify-content-end list" id="topnav"
                [@showMenu]="menuSlide"
            >
                <li class="nav-item" *ngFor="let item of menu index as i"
                    routerLinkActive="active"
                    [hidden]="item.disabled
                    || (item.name === 'exit' && !userAuth())
                    || (item.name === 'enter' && userAuth())">
                    <a class="nav-link" (click)="action($event, item.name)"
                       routerLink="{{item.name}}">
                        <span class="material-icons">{{item.icon}}</span>
                        <span class="text">{{ts.translate('menu.' + item.name)}}</span>
                    </a>
                </li>
                <div id="user-name">
                    <h6>{{userName()}}</h6>
                </div>
            </ul>
            <div class="nav-burger"
                (click)="menuSlide = !menuSlide">
                <span class="material-icons">menu</span>
            </div>
        </div>
    `,
    animations: [
        trigger('showMenu', [
            state('true', style({
                filter: 'none',
                display: '*',
                opacity: 1
            })),
            state('false', style({
                filter: 'blur(3px)',
                display: 'none',
                opacity: 0
            })),
            transition('* => true', useAnimation(anim.blurIn, {
                params: {
                    time: 1000,
                    blur: '50px'
                }
            })),
            transition('true => false', useAnimation(anim.blurOut))
        ])
    ]
})
export class TopNavComponent implements AfterViewInit, AfterViewChecked {
    public menu: object;
    public menuSlide: boolean;
    constructor (
        public ts: TranslatorService,
        public im: InfoMonitor,
        private _am: ActionMonitor,
        public _user: UserService
    ) {
        this.menu = config().app.topnav;
        this.menuSlide = false;
    }
    ngAfterViewInit () {
        try {
            this.menu = config().app.topnav;
            setTimeout(() => {
              this.menuSlide = window.innerWidth > 520;
            }, 10);
        } catch (e) {
            console.log(e);
        }
    }
    ngAfterViewChecked () {
        if (window.innerWidth > 520 && !this.menuSlide) {
          setTimeout(() => {
            this.menuSlide = window.innerWidth > 520;
          }, 10);
        }
    }
    action (e: Event, name: string) {
        e.preventDefault();
        this._am.onAction$.emit({object: 'menu', action: name});
        if (window.innerWidth < 520 && this.menuSlide) {
          setTimeout(() => {
            this.menuSlide = false;
          }, 10);
        }
    }
    userName(): string {
        return this._user.user.name;
    }
    userAuth (): boolean {
        return this._user.user.auth;
    }
}
