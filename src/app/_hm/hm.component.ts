import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TranslatorService} from '../_services';

@Component({
    selector: 'app-hm',
    templateUrl: './hm.component.html',
    styleUrls: ['../../styles.css']
})
export class HmComponent implements OnInit {

    private bckg = '/assets/img/odessa.png';
    private sText = '';
    private subText = ''; // ГИБРИДНАЯ ИНТЕРАКТИВНАЯ СИСТЕМА HYBRID INTERACTIVE ENGINE
    constructor(private _trans: TranslatorService) {
    }
    setStyles() {
        document.querySelector('.start-slide').setAttribute('style',
            'background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/assets/img/odessa.png)');
        document.querySelector('.start-slide h1').innerHTML = this.sText;
        document.querySelector('.start-slide p').innerHTML = this.subText;
    }
    responsive() {
        document.querySelector('.start-slide') .setAttribute('style',
            'height:' + window.innerHeight + 'px;' +
            'background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/assets/img/odessa.png);' +
            '    background-size: cover;');
    }
    ngOnInit() {
        this.sText = '<span>' + this._trans.translate('app.title_1')
            + '</span>' + this._trans.translate('app.title_2');
        this.subText = this._trans.translate('app.systemName');
        this.setStyles();
        this.responsive();
        window.addEventListener('resize', () => this.responsive());
        window.addEventListener('scroll', () => {
            // console.log(window.pageYOffset);
            if ( window.pageYOffset < 600 ) {
                const dark = window.pageYOffset / 500; console.log(window.pageYOffset + ' rt ' + dark);
                document.querySelector('.start-slide').setAttribute('style',
                    'height:' + window.innerHeight + 'px;' +
                    'background: linear-gradient(rgba(0, 0, 0,0.7) 30%, rgba(255, 233, 215,'
                    + dark + ')), url(/assets/img/odessa.png);\n' +
                    'background-size: cover;');
                document.querySelector('.start-slide .cysh-paragraph-transparent').setAttribute('style',
                    'transform: perspective(1000px) translateZ(-' + window.pageYOffset * 4 + 'px);' +
                    'display:inline;\n' +
                    'position:absolute;\n' +
                    'left:0;\n' +
                    'bottom:400px;\n' +
                    'width:100%;' +
                    'opacity:' + (1 - window.pageYOffset / 200) + ';');
            }
        });
    }
}
