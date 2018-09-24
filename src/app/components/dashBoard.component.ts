import {Component, EventEmitter, Output} from '@angular/core';
import {ActionMonitor, InfoMonitor, TranslatorService, UserService} from '../_services';
import {config} from '../config';

@Component({
    selector: 'app-dash',
    template: `
        <div class="dash-board" id="dash-board">
            <div class="dash-block">
                <span *ngFor="let category of categories; index as i">
                    <button class="dash-item {{+ category.selected ? 'active' : ''}}"
                            *ngIf="!category.auth || user.user.auth"
                            title="{{ts.translate('labels.' + category.name)}}"
                            (click)="selectCategory(i)">
                        <span class="material-icons">{{category.icon}}</span>
                        <span title="{{ts.translate('labels.' + category.name)}}">
                        {{ts.translate('labels.' + category.name)}}</span>
                    </button>
                    <div class="dash-block" *ngIf="(!category.auth || user.user.auth) && category.selected">
                            <span *ngFor="let action of category.actions">
                                <button class="dash-item  {{+ action.selected ? 'active' : ''}}"
                                        *ngIf="!action.auth || user.user.auth"
                                        title="{{ts.translate('actions.' + action.action)}}"
                                        (click)="onAct(category.name, action.action)">
                                     <span class="material-icons">{{action.icon}}</span>
                                    <span>{{ts.translate('actions.' + action.action)}}</span>
                                </button>
                            </span>
                    </div>
                </span>
            </div>
        </div>
    `
})
export class DashBoardComponent {
    public actions: any;
    public categories: any;
    @Output() onAction = new EventEmitter<{
        action: string,
        category: string
    }>();
    constructor (
        public ts: TranslatorService,
        public user: UserService,
        private _im: InfoMonitor,
        private _am: ActionMonitor
    ) {
        this.categories = config().app.dash.categories;
    }
    onAct (cat: string, act: string) {
        // this.onAction.emit({
        //     action: act,
        //     category: this.categories.filter(c => c.selected)[0].name
        // });
        this._am.onAction$.emit({object: cat, action: act});
    }
    selectCategory (i: number) {
        this.categories.forEach(c => c.selected = false);
        this.categories[i].selected = !this.categories[i].selected;
        this._im.add(this.ts
            .translate('labels.' + this.categories[i].name), 0);
    }
}
