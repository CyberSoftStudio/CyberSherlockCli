import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// @ts-ignore
import { } from '@types/googlemaps';
import { MediaService } from '../_services/media.service';
import { Media } from '../lib/classes';
import { PolyFilter } from '../lib/classes/PolyFilter';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements AfterViewInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  googleMapsUrl: string;
  polygon: any;
  polygonVisible: boolean;

  markers: any[] = [];

  constructor(private mediaService: MediaService) {
    this.googleMapsUrl = 'http://maps.googleapis.com/maps/api/js?key=AIzaSyCQqiOB_uS2YEbV5d9vsPUpb4s5VavxulQ';
    this.polygonVisible = true;
  }

  ngAfterViewInit() {
    this.addMapsScript();
  }

  addMapsScript() {
    if (!document.querySelectorAll(`[src="${this.googleMapsUrl}"]`).length) {
      document.body.appendChild(Object.assign(
        document.createElement('script'), {
          type: 'text/javascript',
          src: this.googleMapsUrl,
          onload: () => this.mapInit()
        }));
    } else {
      this.mapInit();
    }
  }

  mapInit() {
    const mapProp = {
      center: new google.maps.LatLng(46.48547869999999, 30.7411794),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    // Define the LatLng coordinates for the polygon's path.
    const triangleCoords = [
      { lat: 25.774, lng: -80.190 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
      { lat: 25.774, lng: -80.190 }
    ];
  }


  initPolygon(type: number = 0) {
    // type: 0 - rectangle, 1 - circle, 2 - area.
    if (this.polygon) {
      this.polygon.setMap(null);
    }

    switch (type) {
      case 0:
        this.initRectangle();
        break;
      case 1:
        this.initCircle();
        break;
      case 2:
        this.initArea();
        break;
      default:
        break;
    }
    this.polygonVisible = true;
    this.polygon.setVisible(this.polygonVisible);
  }

  initRectangle() {

    this.polygon = new google.maps.Rectangle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map,
      draggable: true,
      bounds: {
        east: 30.7411794 + 30.7411794 * 0.0001,
        west: 30.7411794 - 30.7411794 * 0.0001,
        north: 46.48547869999999 + 46.48547869999999 * 0.00005,
        south: 46.48547869999999 - 46.48547869999999 * 0.00005
      },
      editable: true,
      visible: this.polygonVisible
    });
    //this.polygon.setMap(this.map);

    google.maps.event.addListener(this.polygon, 'bounds_changed', () => {
      let pointCoord = this.polygon.getBounds();
      let cr_NE = { lat: pointCoord.getNorthEast().lat(), lng: pointCoord.getNorthEast().lng() };
      let cr_SW = { lat: pointCoord.getSouthWest().lat(), lng: pointCoord.getSouthWest().lng() };
      this.mediaService.updateData({ type: 0, r_NE: cr_NE, r_SW: cr_SW });
      // console.dir(this.polygon.getBounds());
    });
  }

  initCircle() {

    this.polygon = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map,
      editable: true,
      visible: this.polygonVisible,
      center: { lat: 46.5, lng: 30.7 },
      radius: 1000
    });

    google.maps.event.addListener(this.polygon, 'radius_changed', () => {
      let rad = this.polygon.getRadius();
      let centCoord = { lat: this.polygon.getCenter().lat(), lng: this.polygon.getCenter().lng() };
      this.mediaService.updateData({ type: 1, c_centre: centCoord, c_rad: rad });
      //console.dir(this.polygon.getBounds());
    });

    google.maps.event.addListener(this.polygon, 'center_changed', () => {
      let rad = this.polygon.getRadius();
      let centCoord = { lat: this.polygon.getCenter().lat(), lng: this.polygon.getCenter().lng() };
      this.mediaService.updateData({ type: 1, c_centre: centCoord, c_rad: rad });
      //console.dir(this.polygon.getBounds());
    });
  }

  initArea() {

    const startCoords = [
      { lat: 46.470409560315495, lng: 30.713843985723884 },
      { lat: 46.466145809817036, lng: 30.73875152035646 },
      { lat: 46.481325599254546, lng: 30.7429051985348 },
      { lat: 46.488132694711055, lng: 30.71658722910888 }
    ];

    this.polygon = new google.maps.Polygon({
      paths: startCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map,
      editable: true,
      draggable: true,
      geodesic: true,
      visible: this.polygonVisible
    });

    google.maps.event.addListener(this.polygon.getPath(), 'insert_at', () => {
      let path = this.polygon.getPath();
      let clear_path = []
      for (let i = 0; i < path.length; i++) {
        clear_path.push({ lat: path.getAt(i).lat(), lng: path.getAt(i).lng() });
      }
      this.mediaService.updateData({ type: 2, a_points: clear_path });
      // console.dir(this.polygon.getBounds());
    });

    google.maps.event.addListener(this.polygon.getPath(), 'remove_at', () => {
      let path = this.polygon.getPath();
      let clear_path = []
      for (let i = 0; i < path.length; i++) {
        clear_path.push({ lat: path.getAt(i).lat(), lng: path.getAt(i).lng() });
      }
      this.mediaService.updateData({ type: 2, a_points: clear_path });
      // console.dir(this.polygon.getBounds());
    });

    google.maps.event.addListener(this.polygon.getPath(), 'set_at', () => {
      let path = this.polygon.getPath();
      let clear_path = []
      for (let i = 0; i < path.length; i++) {
        clear_path.push({ lat: path.getAt(i).lat(), lng: path.getAt(i).lng() });
      }
      this.mediaService.updateData({ type: 2, a_points: clear_path });
      // console.dir(this.polygon.getBounds());
    });
  }


  polygonEnable() {
    if (this.polygon) {
      this.polygonVisible = !this.polygonVisible;
      this.polygon.setVisible(this.polygonVisible);
    }
  }


  onSetMarkerClick() {
    let medias = this.mediaService.getMedia();
    console.log(medias);

    let loc;
    let pos;

    for (let i = 0; i < medias.length; i++) {

      loc = medias[i].location.getLocation();
      pos = new google.maps.LatLng(loc.lat, loc.lng);

      let marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: 'H'
      });

      this.markers.push(marker);
    }
  }

  onRemoveMarkersClick() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  makePolygon(type: number) {
    this.initPolygon(type);
  }
}
