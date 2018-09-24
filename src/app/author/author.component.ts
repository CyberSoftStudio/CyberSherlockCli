import {Component, OnInit} from '@angular/core';
import {TranslatorService} from '../_services';

@Component({
    selector: 'app-author',
    template: `
        <div id="author" class="">
        <div class="start-text">
            <h3>{{ts.translate('app.title_1')}}
                <span>{{ts.translate('app.title_2')}}</span>
            </h3>
        </div>
        <div class="">
            <h5>{{ts.translate('app.systemName')}}</h5>
        </div>
    </div>
        <nav class="navbar navbar-expand-md">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button"
                    data-toggle="collapse" data-target="#navbarsExampleDefault"
                    aria-controls="navbarsExampleDefault" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon">Menu</span>
            </button>
            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home
                            <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Disabled</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#"
                           id="dropdown01" data-toggle="dropdown" aria-haspopup="true"
                           aria-expanded="false">Dropdown</a>
                        <div class="dropdown-menu" aria-labelledby="dropdown01">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    `,
    styles: [`
        @import url('https://fonts.googleapis.com/css?family=Orbitron');
        #author {
            display: block;
            position: relative;
            width: 100%;
            background: linear-gradient(rgba(100,100,100, 0.9) 10%
            , #000 , rgba(100,100,100, 0.2)), url('/assets/img/odessa.png');
        }

        .start-text {
            display: block;
            position: absolute;
            top: 35%;
            width: 100%;
        }

        #author h3, #author h3 span, #author h5 {
            font-family: "Orbitron", sans-serif;
            font-weight: 100;
            margin: 0;
            padding: 0;
            text-align: center;
            color: #66e0ff;
        }

        #author h3 {
            font-size: 40px;
            font-style: italic;
        }

        #author h3 span {
            font-size: 20px;
        / / color: #fff;
        }

        #author h5 {
            font-size: 12px;
            letter-spacing: 10px;
        }

        #author div:nth-child(1) {
            padding: 20px 0;
        }

        #author div:nth-child(2) {
            padding: 10px 0;
        }
    `]
})
export class AuthorComponent implements OnInit {
    constructor (public ts: TranslatorService) {}
    ngOnInit () {
        const dom = document.getElementById('author');
            dom.style.height = window.innerHeight * 0.5 + 'px';
    }
}
