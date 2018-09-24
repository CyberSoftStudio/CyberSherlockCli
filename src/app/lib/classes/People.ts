import {Device} from './Device';
import {MarkerObject} from './MarkerObject';

export class People extends MarkerObject{
    public id: string;
    public type: number;
    public devices: Device[];
    constructor (data: any) {
        super();
        if (data.lat && data.lng) {
            this.location.setLocation(data.lat, data.lng);
        }
        this.id = '';
        this.type = 0;
        this.devices = [];
        this.iconUrlSelected = '../../assets/img/icons/mapGPS/task_new_photo_active.png';
        this.iconUrlUnSelected = '../../assets/img/icons/mapGPS/task_new_photo_.png';
        this.iconUrl = this.iconUrlUnSelected;
    }
}

