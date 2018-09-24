import {Src} from './Src';
import {MarkerObject} from './MarkerObject';

export class Media extends MarkerObject {
    public id: string;
    public type: number; // 0-photo, 1-video, 2-audio
    public txid: string; // hash
    public filename: string; // timestamp + 'LAT' + value + 'LNG' + value + '.' + extention
    public sha3: string;
    public url: string;
    public sources: Src[];
    public cost: number;
    public owner: string;
    public deviceType: number; // 0 - local, 1 - remote(ip-webcam)
    public direction: {
        horizont: number,
        vertical: number
    };
    public neuro: string[];
    constructor (data: any) {
        super();
        if (data.location) {
            this.location.setLocation(data.location.lat, data.location.lng, data.location.type);
        }
        this.id = '';
        this.type = 0;
        this.txid = '';
        this.url = '';
        this.sources = [];
        this.cost = 0;
        this.sha3 = '';
        this.neuro = [];
        this.deviceType = 0;
        this.direction = {
            horizont: 0,
            vertical: 0
        };
        this.owner = '';
        this.iconUrlSelected = '../../assets/img/icons/mapGPS/task_new_photo_active.png';
        this.iconUrlUnSelected = '../../assets/img/icons/mapGPS/task_new_photo_.png';
    }
    public getFileName (ext: string = 'jpg') {
        const location = this.location.getLocation();
        return this.created.getTime()
            + 'LAT' + location.lat
            + 'LNG' + location.lng
            + '.' + ext;
    }
}
