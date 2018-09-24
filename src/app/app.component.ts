import {AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {TranslatorService} from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  public title = '';
  constructor(
      private _trans: TranslatorService
  ) {}
  ngOnInit() {
    this._trans.set('EN');
    this.init();
    this.title = this._trans.translate('app.title_1')
        + this._trans.translate('app.title_2');
  }
  init() {
    document.querySelector('head title').innerHTML = this._trans.translate('app.title_1')
        + this._trans.translate('app.title_2');
  }
  ngAfterViewChecked () {
    const h = window.innerHeight + 'px';
      const body = document.querySelector('body');
      if (body.style.minHeight !== h) {
        body.style.minHeight = h;
      }
  }
}
