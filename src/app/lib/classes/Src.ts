import {Location} from './Location';

export class Src {
    public src: string;
    public time: number;
    public location: Location;
    constructor() {
        this.location = new Location();
        this.location.setLocation();
    }
}
