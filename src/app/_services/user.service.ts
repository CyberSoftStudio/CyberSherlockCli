import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {config} from '../config';
import axios from 'axios';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {
    public user: {
        auth: boolean,
        id: string,
        email: string,
        phone: string,
        name: string,
        token: string,
        authType: number
    };
    private _config: any;
    private _axios: any;
    constructor (private _http: HttpClient
    ) {
        this._userSet();
        this.user.auth = false;
        this._config = config();
        this._axios = axios;
    }
    private _userSet(data?: any) {console.dir(data);
        this.user = {
            id: data && data.id || '',
            email: data && data.email || '',
            phone: data && data.phone || '',
            auth: Boolean (data && data.token && data.token.length),
            token: data && data.token || '',
            name: data && (data.name || data.email || data.phone) || '',
            authType: 0 // 0-'local' 1-'facebook', 2-'google', 3-'linked', 4-'instagram', 'youtube'
        };
        return true;
    }
    public userLogout () {
        return this.user.auth ? this._userSet() : false;
    }
    public gAuth () {
        /*ax({
            method: 'post',
            url: 'http://localhost:3080',
            data: {
                jsonrpc: '2.0',
                method: 'auth_local_email',
                params: ['12345678', 'mykola_borodyn@ecoengineer.in.ua'],
                id: 144
            }
        })
            .then(res => console.dir(res))
            .catch(err => console.dir(err));*/
        axios({
            method: 'get',
            // url: 'https://accounts.google.com/o/oauth2/v2/auth',
            url: 'https://google.com',
            params: {
                client_id: this._config.clientId,
                scope: 'profile'
            },
            withCredentials: true
        });
    }
    public createLocalUser (data: any) {
        return new Promise((resolve, reject) => {
            try {
                const params = [];
                params.push(data.passphrase);
                params.push(data.email);
                params.push(data.phone);
                this._ax('user_create_local', params)
                    .then(response => {
                        if (response['result'].user) {
                            this._userSet(response['result'].user);
                            this.user.auth = true;
                            return resolve(true);
                        } else {
                            return reject('User service error.');
                        }
                })
                    .catch(err => {
                    return reject(err);
                });
            } catch (e) {
                return reject(e);
            }
        });
    }
    public createGoogleUser (data: Object) {
        return new Promise( (resolve, reject) => {
            try {
                const params = [];
                params.push(data['g_id']);
                params.push(data['g_at']);
                params.push(data['g_email']);
                params.push(data['g_name']);
                this._ax('user_create_google', params)
                    .then(response => {
                        if (response['error']) {
                            return reject(response['error'].code || 'User service error');
                        } else {
                            this._userSet(response['result']['user']);
                            this.user.auth = true;
                            return resolve(true);
                        }
                    })
                    .catch(err => {
                        return reject(err);
                    });
            } catch (e) {
                return reject(e);
            }
        });
    }
    public loginLocalUser (data: any) {
        return new Promise((resolve, reject) => {
            try {
                const params = [];
                const rpc_method = data.email && data.email.length > 0 ?
                    'auth_local_email' : 'auth_local_phone';
                params.push(data.passphrase);
                params.push(rpc_method === 'auth_local_email' ? data.email : data.phone);
                this._ax(rpc_method, params)
                    .then(response => {console.dir(response);
                        if (response['error']) {
                            return reject(response['error'].code || 'User service error');
                        } else {
                            this._userSet(response['result']['user']);
                            this.user.auth = true;
                            this.user.authType = 0;
                            return resolve(true);
                        }
                    })
                    .catch(err => {
                        return reject(err);
                    });
            } catch (e) {
                return reject(e);
            }
        });
    }
    public loginGoogleUser (data: Object) {
        return new Promise( (resolve, reject) => {
            try {
                const params = [];
                params.push(data['g_id']);
                params.push(data['g_at']);
                this._ax('auth_google_login', params)
                    .then(response => {
                        if (response['error']) {
                            return reject(response['error'].code || 'User service error');
                        } else {
                            this._userSet(response['result']['user']);
                            this.user.auth = true;
                            this.user.authType = 2;
                            return resolve(true);
                        }
                    })
                    .catch(err => {
                        return reject(err);
                    });
            } catch (e) {
                return reject(e);
            }
        });
    }
    private _ax (method: string, params: any) {
        return new Promise( (resolve, reject) => {
            try {
                axios.post(this._config.app.url_server, {
                        jsonrpc: '2.0',
                        method: method,
                        params: params,
                        id: 144
                })
                    .then(response => {
                        if (response.data) {
                            return resolve(response.data);
                        } else {
                            return reject('User service error.');
                        }
                    })
                    .catch(err => {console.log(err.message);
                        return reject(err);
                    });
            } catch (e) {
                return reject(e);
            }
        });
    }
}
