import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActionMonitor, InfoMonitor, TranslatorService, UserService} from '../_services';
import {anim} from './animations';
import {state, style, transition, trigger, useAnimation} from '@angular/animations';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-login',
    template: `
        <div [@login]="show"
                class="modal-block">
            <form class="form login-form
                        col-sm-6 offset-sm-3
                        col-lg-4 offset-lg-4" id="loginForm">
                <div class="form-block">
                    <button class="form-close"
                            title="{{ts.translate('buttons.close')}}"
                            (click)="loginCancel($event)">
                        <span class="material-icons">
                            exit_to_app
                        </span>
                    </button>
                </div>
                <div class="form-block flex-row">
                    <button class="col-sm-6
                                select-btn {{ + lin ? 'active' : ''}}"
                                (click)="loginSwitch($event, true)">
                        {{ts.translate('buttons.enter')}}
                    </button>
                    <button class="col-sm-6
                                select-btn {{ + !lin ? 'active' : ''}}"
                                (click)="loginSwitch($event, false)">
                        {{ts.translate('buttons.genesis')}}
                    </button>
                </div>
                <div class="form-block flex-column">
                    <label for="email" class="col-12">
                        {{ts.translate(lin ? 'labels.email_phone' : 'labels.email')}}
                    </label>
                    <input type="text" name="email"
                           (input)="showValidateFormFieldError($event.target)"
                           (change)="showValidateFormFieldError($event.target, 1)"/>
                </div>
                <div [@ln]="lin" class="form-block flex-column">
                    <label for="phone">
                        {{ts.translate('labels.phone')}}
                    </label>
                    <input type="text" name="phone"
                           (input)="showValidateFormFieldError($event.target)"
                           (change)="showValidateFormFieldError($event.target, 1)"/>
                </div>
                <div class="form-block flex-column">
                    <label for="passphrase">
                        {{ts.translate('labels.passphrase')}}
                    </label>
                    <input type="password" name="passphrase"
                           (input)="showValidateFormFieldError($event.target)"
                           (change)="showValidateFormFieldError($event.target, 1)"/>
                </div>
                <div [@ln]="lin" class="form-block flex-column">
                    <label for="cpassphrase">
                        {{ts.translate('labels.cpassphrase')}}
                    </label>
                    <input type="password" name="cpassphrase"
                           (input)="showValidateFormFieldError($event.target)"
                           (change)="showValidateFormFieldError($event.target, 1)"/>
                </div>
                <div class="form-block button-block text-center">
                    <button class="col-sm-6 col-sm-offset-3"
                    (click)="localLogin($event)">
                        {{ts.translate('buttons.' + (lin ? 'login' : 'create'))}}
                    </button>
                </div>
                <div class="form-block button-block social-block flex-column">
                    <app-glogin [lin]="lin" (onGoogle)="googleLogin($event)"></app-glogin>
                    <app-flogin [lin]="lin"></app-flogin>
                    <app-llogin [lin]="lin"></app-llogin>
                    <app-tlogin [lin]="lin"></app-tlogin>
                </div>
            </form>
        </div>
        <div [@logout]="showLogout"
                    class="modal-block">
            <form class="form logout-form
                        col-sm-6 offset-sm-3
                        col-lg-4 offset-lg-4" id="logoutForm">
                <div class="form-block button-block text-center">
                    <h3>{{ts.translate('info.logout')}}
                    </h3>
                </div>
                <div class="form-block flex-row">
                    <span class="col-6 text-center">
                        <button class="col-8"
                                (click)="showLogout = false">
                            {{ts.translate('buttons.cancel')}}
                        </button>
                    </span>
                    <span class="col-6 text-center">
                        <button class="col-8"
                                (click)="logout($event)">
                            {{ts.translate('buttons.logout')}}
                        </button>
                    </span>
                </div>
            </form>
        </div>
    `,
    animations: [
        trigger('login', [
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
        ]),
        trigger('logout', [
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
        ]),
        trigger('ln', [
            state('true', style({height: '0px'})),
            state('false', style({height: '*'})),
            transition('true => false', useAnimation(anim.scrollIn,
                {params: {
                        time: 300
                    }})),
            transition('false => true', useAnimation(anim.scrollOut,
                {params: {
                        time: 300
                    }}))
        ])
    ]
})
export class LoginComponent implements OnInit, OnDestroy {
    public lin: boolean;
    public show: boolean;
    public showLogout: boolean;
    private _action: Subscription;
    private _loginForm: any;
    constructor (
        public ts: TranslatorService,
        public im: InfoMonitor,
        private _am: ActionMonitor,
        private _user: UserService,
    ) {
        this.show = this.showLogout = false;
        this.lin = true;
    }
    ngOnInit () {
        this._action = this._am.onAction$
            .subscribe(data => {
                if (data.object === 'menu') {
                    return data.action === 'enter' ? this.loginAction() :
                        data.action === 'exit' ? this.showLogout = true : null;
                } else {
                    return false;
                }
            });
        this._loginForm = document.querySelector('#loginForm');
    }
    ngOnDestroy () {
        if (this._action) {
            this._am.onAction$.unsubscribe();
        }
    }
    loginAction () {
        this.show = true;
    }
    loginSwitch (e: Event, stateLin: boolean) {
        e.preventDefault();
       this.lin = stateLin;
    }
        showValidateFormFieldError (target: any, showError: boolean = false) {
        const tElement = target.previousElementSibling;
        if (target.name === 'email' && target.value.match(/(^\+\d+$)|(\d+$)/) !== null) {
            target = {
                name: 'phone',
                value: target.value
            };
        }
        if (!this.validateField(target)) {
            // $(target.previousElementSibling).css({color: this._styles.errorColor});
            tElement.className = (tElement.className.indexOf(' error-form-field') < 0) ?
                tElement.className.concat(' error-form-field') :
                tElement.className;
            if (showError) {
                this.im.add(target.name + ' '
                + this.ts.translate('err.' + target.name), 2);
            }
        } else {
            // $(target.previousElementSibling).css({color: this._styles.mainColor});
            tElement.className = tElement.className
                .replace(' error-form-field', '');
        }
    }
    validateField (target)  {
        const valid = {
            email: function (value) {
                return (typeof(value) === 'string'
                    && (value.length === 0
                    || null !== value.match
(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)));
            },
            phone: function (value) {
                return (typeof(value) === 'string'
                    && (value.length === 0
                    || null !== value.match
                    (/^\+\d{12}$/)
                    && value.length === 13));
            },
            passphrase: function (value) {
                return (typeof(value) === 'string'
                    && value.length >= 8
                    && value.length < 256);
            },
            cpassphrase: function (value) {
                return (typeof(value) === 'string'
                    && value.length >= 8
                    && value.length < 256);
            }
        };
        return valid[target.name] ? valid[target.name](target.value) : false;
    }
    formValidate (form, ln) {
        return new Promise( (resolve, reject) => {
            try {
                const fields = form.getElementsByTagName('input'),
                    emlPhn = form.querySelector('input[name=email]');
                if (ln) {
                    if (emlPhn.value.match(/(^\+\d+$)|(\d+$)/) !== null) {
                        const field = {
                                name: 'phone',
                                value: emlPhn.value
                            },
                            pass = form.querySelector('input[name=passphrase]');
                        if (!this.validateField(field)) {
                            return reject(field);
                        }
                        if (pass && !this.validateField(pass)) {
                            return reject(pass);
                        }
                    } else {
                        const field = {
                                name: 'email',
                                value: emlPhn.value
                            },
                            pass = form.querySelector('input[name=passphrase]');
                        if (!this.validateField(field)) {
                            return reject(field);
                        }
                        if (pass && !this.validateField(pass)) {
                            return reject(pass);
                        }
                    }
                } else {
                    let emph = false, ps, cps;
                    for (let i = 0; i < fields.length; i++) {console.dir(fields.item(i));
                        if (!fields.item(i).disabled && !this.validateField(fields.item(i))) {
                            return reject(fields.item(i));
                        }
                        if ((fields.item(i).name === 'email' && fields.item(i).value.length)
                            || (fields.item(i).name === 'phone' && fields.item(i).value.length)) {
                            emph = true;
                        }
                        if (fields.item(i).name === 'passphrase') {
                            ps = fields.item(i);
                        }
                        if (fields.item(i).name === 'cpassphrase') {
                            cps = fields.item(i);
                        }
                    }
                    if (!emph) {
                        return reject(emph);
                    }
                    if (cps && ps.value !== cps.value) {
                        return reject(cps);
                    }
                }
                return resolve();
            } catch (e) {
                return reject(e);
            }
        });
    }
    formReset (form) {
        return new Promise((resolve, reject) => {
            try {
                const fields = form.querySelectorAll('input');
                for (let i = 0; i < fields.length; i++) {
                    fields.item(i).value = null;
                }
                return resolve(true);
            } catch (e) {
                return reject(e);
            }
        });
    }
    localLogin (e: Event) {
        try {
            e.preventDefault();
            this.formValidate(this._loginForm, this.lin)
                .then(() => {
                    const data: any = {
                        passphrase: this._loginForm.passphrase.value
                    };
                    if (this.lin) {
                        if (this._loginForm.email.value.match(/^\+\d{12}$/) !== null) {
                            data.phone = this._loginForm.email.value;
                        } else {
                            data.email = this._loginForm.email.value;
                        }
                        return this._user.loginLocalUser(data);
                    } else {
                        data.email = this._loginForm.email.value;
                        data.phone = this._loginForm.phone.value;
                        return this._user.createLocalUser(data);
                    }
                })
                .then(user => {
                    if (!user) {
                        const error = 'User service error.';
                        this.im.add(error, 2);
                        return Promise.reject(error);
                    } else {
                        this.show = false;
                        const msg = this.ts.translate('info.welcome') + ' '
                            + this._user.user.name;
                        this.im.add(msg, 0);
                        return this.formReset(this._loginForm);
                    }
                })
                .then(reset => {
                    return reset;
                })
                .catch(err => {
                    let errorMsg = err;
                    if (err === false) { errorMsg = 'email_or_phone'; }
                    if (err.name) { errorMsg = err.name; }
                    if (err.name === 'cpassphrase') { errorMsg = 'passphrase_cpass'; }
                    this.im.add(this.ts
                            .translate('err.' + errorMsg || 'server_error') , 2);
                });
        } catch (e) {
            this.im.add(e, 2);
        }
    }
    googleLogin (g_user: Object) {
        try {
            const self = this;
            if (!g_user['g_status']) {
                self.im.add(this.ts
                    .translate('error.google'), 2);
            } else {
                if (self.lin) {
                    self._user.loginGoogleUser(g_user)
                        .then(user => {
                            if (!user) {
                                const error = 'User service error.';
                                self.im.add(error, 2);
                                return Promise.reject(error);
                            } else {
                                self._loginForm.querySelector('.form-close').click();
                                self.show = false;
                                const msg = self.ts.translate('info.welcome') + ' '
                                    + self._user.user.name;
                                self.im.add(msg, 0);
                                return self.formReset(self._loginForm);
                            }
                        })
                        .then(reset => {
                            return reset;
                        })
                        .catch(err => {console.dir(err);
                            const errorMsg = err; self.im.add('Error', 2);
                            self.im.add(self.ts
                                .translate('err.' + errorMsg || 'server_error') , 2);
                        });
                } else {
                    self._user.createGoogleUser(g_user)
                        .then(user => {
                            if (!user) {
                                const error = 'User service error.';
                                self.im.add(error, 2);
                                return Promise.reject(error);
                            } else {
                                self.show = false;
                                const msg = self.ts.translate('info.welcome') + ' '
                                    + self._user.user.name;
                                self.im.add(msg, 0);
                                return self.formReset(self._loginForm);
                            }
                        })
                        .then(reset => {
                            return reset;
                        })
                        .catch(err => {console.dir(err);
                            const errorMsg = err;
                            self.im.add(self.ts
                                .translate('err.' + errorMsg || 'server_error') , 2);
                        });
                }
            }
        } catch (e) {
            this.im.add(this.ts
                .translate('err.google') + ' ' + e.message, 2);
        }
    }
    logout (e: Event) {
        e.preventDefault();
        this._user.userLogout();
        this.showLogout = false;
    }
    userName(): string {
        return this._user.user.name;
    }
    loginCancel (e: Event) {
        e.preventDefault();
        this.formReset(this._loginForm)
            .then(res => {})
            .catch(err => this.im.add(err.message, 2));
        this.show = false;
    }
}
