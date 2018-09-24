import {AfterViewInit, Component, Input} from '@angular/core';
import {Media, Src} from '../lib/classes';
import {ActionMonitor, InfoMonitor, MediaService, TranslatorService} from '../_services';
import {Utils} from '../lib';
import {anim} from './animations';
import {state, style, transition, trigger, useAnimation} from '@angular/animations';
import * as uploader from '../lib/uploader.js';
import {HttpClient} from '@angular/common/http';
import * as sha from 'sha.js';
import {Subscription} from "rxjs";

@Component ({
    selector: 'app-media-comp',
    template: `
        <div class="modal-component"
                    id="media-component" [@mediaShow]="enable">
            <form class="modal-form-component
                    col-sm-10 offset-sm-1
                    col-lg-8 offset-lg-2">
                <div class="form-block">
                    <div class="card col-12 media-preview">
                        <div class="card-block text-center block-media">
                            <div class="block-video col-12 text-center">
                                <video autoplay [hidden]="imgPreview">
                                </video>
                                <img [src]="selectedURL" [hidden]="!imgPreview"/>
                                <div class="panel-block" *ngIf="media && !media.id">
                                    <h6 class="col-12"
                                       *ngIf="media && media.sources && media.sources.length < 1">
                                        {{ts.translate('medias.add_media')}}</h6>
                                    <span (click)="enableVideo($event)"
                                          class="material-icons"
                                          title="{{ts.translate('medias.add_media')}}">
                                    camera_enhance
                                    </span>
                                </div>
                                <div class="panel-block-right">
                                    <span (click)="mediaCancel($event)"
                                          class="material-icons"
                                          title="{{ts
                                          .translate('buttons.close')}}">
                                    exit_to_app
                                    </span>
                                    <span (click)="saveSrcToGDrive($event)"
                                          *ngIf="selectedURL && !media.id"
                                          class="material-icons"
                                          title="{{ts
                                          .translate('medias.save_to_google_drive')}}">
                                    cloud_upload
                                    </span>
                                    <span (click)="delete($event)"
                                          *ngIf="selectedURL"
                                          class="material-icons"
                                          title="{{ts
                                          .translate('actions.delete')}}">
                                    delete_forever
                                    </span>
                                </div>
                            </div>
                            <div class="block-img-preview col-12 text-center" *ngIf="enable && !media.id">
                                <img *ngFor="let msrc of media.sources; index as ik"
                                     [src]="msrc.src"
                                     height="80px"
                                     (click)="enablePreview(ik)"/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    `,
    animations: [
        trigger('mediaShow', [
            state('false', style({display: 'none', opacity: 0})),
            state('true', style({display: '*', opacity: 1})),
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
export class MediaComponent implements AfterViewInit {
    private _form: any;
    private _videoOn: boolean;
    private  _video: any;
    private _canva: any;
    private _open: Subscription;
    private _domComponent: any;
    public enable: boolean;
    public media: Media;
    public imgPreview: boolean;
    public selectedURL: string;
    public selectedIndex: number;
    public mediaFile: File;
    constructor (
        public ts: TranslatorService,
        public im: InfoMonitor,
        public ms: MediaService,
        private http: HttpClient,
        private _am: ActionMonitor
    ) {
        this.enable = false;
        this._videoOn = false;
        this._canva = this._video = null;
        this.imgPreview = false;
        this.selectedURL = '';
        this.selectedIndex = 0;
        this._open = this._am.onAction$.subscribe(data => {
            if (['media'].indexOf(data['object']) >= 0 && ['openMedia'].indexOf(data['action']) >= 0) {
              this.showComponent();
            }
        });
    }
    ngAfterViewInit () {
        this._canva = document.createElement('canvas');
        this._domComponent = document.getElementById('media-component');
    }
    showComponent () {
      this.media = this.ms.getSelectedMedia();
      this.enable = true;
      this._form = this._domComponent.querySelector('form');
      this._video = this._form.querySelector('video');
      if (this.media.id) {
        this.enablePreview(0);
      }
    }
    showValidateFormFieldError () {}
    mediaCancel (e: Event) {
        e.preventDefault();
        this.imgPreview = false;
        if (this._videoOn) {
            this._video.srcObject = null;
            this._videoOn = false;
        }
        this.enable = false;
    }
    changeLocationType (e: Event) {
        e.preventDefault();
        if (this.media.local) {
            this.media.location.setType(e.currentTarget['value']);
        } else {
        return false;
        }
    }
    changeMediaType (e: Event) {
        e.preventDefault();
        if (this.media.local) {
            this.media.type = e.currentTarget['value'];
        } else {
            return false;
        }
    }
    saveMedia (e: Event) {
        e.preventDefault();
        this.enable = false;
    }
    preview (e: Event) {
        e.preventDefault();
        this.media.sources = this._form.getElementsByTagName('input')['url'].value;
    }
    enableVideo (e: Event) {
        e.preventDefault();
        this._canva.height = this._video.videoHeight;
        this._canva.width = this._video.videoWidth;
        if (!this._videoOn) {
            navigator.mediaDevices
                .getUserMedia({video: {width: {min: 1280}, height: {min: 720}}})
                .then(strm => {
                    this._video.srcObject = strm;
                    this._videoOn = true;
                }).catch(err => {
                console.dir(err);
            });
        } else if (!this.imgPreview) {
            this.imgPreview = false;
            this._canva.getContext('2d').drawImage(this._video, 0, 0);
            const time = (new Date()).getTime();
            this.media.sources.push({
                src: this._canva.toDataURL('image/jpeg'),
                time: time,
                location: this.media.location
            });
            this.selectedURL = this.media.sources[this.media.sources.length - 1].src;
            this.selectedIndex = this.media.sources.length - 1;
        } else {
            this.imgPreview = false;
        }
    }
    enablePreview (k: number) {
        this.selectedURL = this.media.sources[k].src;
        this.selectedIndex = k;
        this.imgPreview = true;
    }
    saveToGoogleDrive (file: File) {
        return new Promise((resolve, reject) => {
            try {console.log('in 1 ...');
                this.getGoogleToken()
                    .then((token) => {console.log('in 5 ...');
                        if (!token) {console.log('in 4 ...');
                            this.im.add('No Google Token', 2);
                            return reject();
                        } else {console.log('in 2 ...');
                            const upl = new uploader.MediaUploader({
                                metadata: {
                                    'title': file.name,
                                    'name': file.name
                                },
                                permissions: ['anyone'],
                                file: file,
                                token: token,
                                onComplete: (data) => {
                                    const dt = JSON.parse(data);
                                    // console.dir(window['gapi']);
                                    window['gapi'].client.request({
                                        path: 'https://www.googleapis.com/drive/v3/files/'
                                        + dt['id'] + '/permissions',
                                        method: 'POST',
                                        callback: response => {
                                            return resolve(dt['id']);
                                        },
                                        body: {
                                            role: 'reader',
                                            type: 'anyone'
                                        }
                                    });
                                },
                                onError: (error) => {
                                    return reject(error);
                                }
                            });
                            return upl.upload();
                        }
                    })/*
                    .then(fk => {console.log('fk ' + fk);
                        return resolve();
                    })*/
                    .catch(err => {
                        return reject(err);
                    });
            } catch (e) {
                return reject(e);
            }
        });
    }
    getGoogleToken() {
    return new Promise((resolve, reject) => {
        try {
            const GoogleAuth = window['gapi'].auth2.getAuthInstance();
            GoogleAuth.isSignedIn.listen();
            if (!GoogleAuth.isSignedIn.get()) {
                GoogleAuth.signIn()
                    .then(gauth => {
                        if (!gauth) {
                            return reject();
                    } else {
                            const token = window['gapi'].auth2.getAuthInstance()
                                .currentUser.get().Zi.access_token;
                            return resolve(token);
                        }}
                    )
                    .catch(err => {
                        return reject(err);
                    });
            } else {
                const token = window['gapi'].auth2.getAuthInstance()
                    .currentUser.get().Zi.access_token;
                return resolve(token);
            }
        } catch (error) {
            return reject(error);
        }
    });
}
    saveSrcToGDrive(e: Event) {
        e.preventDefault();
        console.dir(this.media);
        console.dir(this.selectedIndex);
        const srcSelected = Object.create(this.media.sources[this.selectedIndex]);
        this.media.sources = [];
        this.media.sources.push(srcSelected);
        let file: File = null;
        this.createFiles( srcSelected /*this.media.sources[this.selectedIndex]*/ )
            .then(files => {
                file = files[0];
                return this.makeSha256(file);
            })
            .then((fileSHA3: string) => {
                this.media.sha3 = fileSHA3;
                this.media.setCreated();
                this.media.filename = file.name;
                console.dir(file);
                console.dir(this.media);
                return /*'123345';*/this.saveToGoogleDrive(file);
            })
            .then((gUrl: any) => {console.log('in...');
                this.media.url = 'https://drive.google.com/open?id=' + gUrl;
                return this.ms.sendMediaToServer(this.media);
            })
            .then((serverMedia: Media) => {
              this.media.id = serverMedia.id;
                this.im.add('Done! Media created. Id: ' + String(this.media.id), 0);
                return true;
            })
            .catch(error => {
                this.im.add(error, 2);
                return false;
            });
    }
    createFiles(src: Src) {
        return new Promise((resolve, reject) => {
            const location = src.location.getLocation();
            const fileName = src.time + 'LAT' + location.lat.toString()
                .replace('.', 'P') + 'LNG' + location
                .lng.toString().replace('.', 'P') + '.jpg';
            Utils.srcToFile([
                {src: src.src,
                    filename: fileName,
                    mimeType: 'image/jpeg'}
            ]).next().value
                .then(function (files) {
                    return resolve(files);
                })
                .catch(error => {
                    return reject(error);
                });
        });
    }
    delete(e: Event) {
        e.preventDefault();
        this.deleteSrc(this.selectedIndex);
    }
    deleteSrc(index: number) {
        this.media.sources = this.media.sources.filter((src, ind) => {
            return ind !== index;
        });
        this.selectedIndex = this.selectedIndex > 0 ? --this.selectedIndex : 0;
        this.selectedURL = this.media.sources[this.selectedIndex].src || '';
    }
    sendTo() {}
    makeSha256(file: File) {
        return new Promise((resolve, reject) => {
            try {
                const reader = new FileReader();
                reader.readAsText(file);
                reader.onload = (event: any) => {
                    const shaF = sha('sha256');
                    return resolve(shaF.update(event.target.result).digest('hex'));
                };
                reader.onerror = err => {
                    return reject(err);
                };
            } catch (error) {
                return reject(error);
            }
        });
    }
}

// TODO remove all src after saveToGoogleDrive
