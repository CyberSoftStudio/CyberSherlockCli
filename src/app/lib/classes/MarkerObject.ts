import {DT} from './DT';
import {Location} from './Location';

export class MarkerObject {
    public location: Location;
    public created: DT;
    public iconUrl: string;
    public iconUrlSelected: string;
    public iconUrlUnSelected: string;
    public local: boolean;
    public draggable: boolean;
    public opacity: number;
    public description: string;
    public selected: boolean;
    constructor () {
        this.location = new Location();
        this.created = new DT((new Date()).getTime());
        this.local = true;
        this.draggable = true;
        this.opacity = 1;
        this.iconUrlSelected = '../../assets/img/icons/mapGPS/task_new_photo_active.png';
        this.iconUrlUnSelected = '../../assets/img/icons/mapGPS/task_new_photo_.png';
        this.description = '';
        this.deselect();
    }
    public setLocation (data: Object) {
        if (this.draggable) {
            this.location.setLocation(data['lat'], data['lng']);
            return true;
        } else {
            return false;
        }
    }
    public setCreated (data: number = (new Date()).getTime()) {
        this.created = new DT(data);
    }
    public hide() {
        this.opacity = 0;
    }
    public show() {
        this.opacity = 1;
    }
    public transparent() {
        this.opacity = 0.3;
    }
    public select() {
        this.selected = true;
        this.iconUrl = this.iconUrlSelected;
    }
    public deselect() {
        this.selected = false;
        this.iconUrl = this.iconUrlUnSelected;
    }
}