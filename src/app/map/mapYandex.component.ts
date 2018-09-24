import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {TranslatorService} from '../_services';
import * as $ from 'jquery';
@Component ({
    selector: 'app-map',
    template: `<div class="slide-container" id="map">
        <agm-map title="ts.translate('menu.map')"
                 [latitude]="map.lat"
                 [longitude]="map.lng"
                 [zoom]="map.zoom">
            <agm-marker [latitude]="map.lat"
                        [longitude]="map.lng">
            </agm-marker>
        </agm-map>
    </div>`
})
export class MapYandexComponent implements AfterViewChecked{
    public map: {
        lat: number,
        lng: number,
        zoom: number
    };
    constructor (
        public ts: TranslatorService
    ) {
        this.map = {
            lat: 46.4325695,
            lng: 30.7426535,
            zoom: 18
        };
    }
    ngAfterViewChecked () {
        const h = window.innerHeight,
            mapDom = document.querySelector('#map agm-map');
        if (mapDom.clientHeight !== h) {
            $(mapDom).css({height: h + 'px'});
        }
    }
}
