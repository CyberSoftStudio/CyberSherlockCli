import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatorService} from '../_services';
import {config} from '../config';

@Component({
    selector: 'app-glogin',
    template: `
        <button id="glogin"
                class="social-btn button-default col-12"
        (click)="glogin($event)">
            {{ts.translate('buttons.' + (lin ? 'enter_with' : 'genesis_with'))
        + ts.translate('buttons.glogin')}}
        </button>
    `
})
export class GoogleLoginComponent {
    private _g_user: Object;
    @Input() lin: boolean;
    @Output() onGoogle = new EventEmitter<Object>();
    constructor (
        public ts: TranslatorService
    ) {
        this._g_user = {
            g_status: false,
            g_id: '',
            g_at: '',
            g_email: '',
            g_name: ''
        };
    }
    public glogin (e: Event) {
        try {
            e.preventDefault();
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/api.js';
            script.addEventListener('load', () => {
                window['gapi'].load('client:auth2', () => {
                    window['gapi'].client.init({
                        apiKey: config().app.google.apiKey,
                        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
                        clientId: config().app.google.clientId,
                        scope: 'profile https://www.googleapis.com/auth/drive'
                    })
                        .then(() => {
                            const GoogleAuth = window['gapi'].auth2.getAuthInstance();
                            GoogleAuth.isSignedIn.listen();
                            if (!GoogleAuth.isSignedIn.get()) {
                                return GoogleAuth.signIn();
                            } else {
                                return true;
                            }
                        })
                        .then (res => {
                            if (!res) {
                                console.dir('Google auth error.');
                                this._g_user['g_status'] = false;
                                this.onGoogle.emit(this._g_user);
                                return false;
                            } else {
                                try {
                                    const GoogleAuth = window['gapi'].auth2.getAuthInstance();
                                    const user = GoogleAuth.currentUser.get(); console.dir(user);
                                    this._g_user['g_id'] = user.w3.Eea;
                                    this._g_user['g_at'] = user.Zi.access_token;
                                    this._g_user['g_email'] = user.w3.U3;
                                    this._g_user['g_name'] = user.w3.ig;
                                    this._g_user['g_status'] = true;
                                    this.onGoogle.emit(this._g_user);
                                    return true;
                                } catch (e) {
                                    console.dir(e);
                                    this._g_user['g_status'] = false;
                                    this.onGoogle.emit(this._g_user);
                                }
                            }
                        })
                        .catch(err => {
                            console.dir(err);
                            this._g_user['g_status'] = false;
                            this.onGoogle.emit(this._g_user);
                        });
                });
            });
            document.body.appendChild(script);
        } catch (e) {
            console.dir(e);
            this._g_user['g_status'] = false;
            this.onGoogle.emit(this._g_user);
        }
    }
}
