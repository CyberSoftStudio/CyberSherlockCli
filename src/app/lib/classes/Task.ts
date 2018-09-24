import {MarkerObject} from './MarkerObject';

export class Task extends MarkerObject {
    public id: string;
    public type: number;
    public description: string;
    public cost: number;
    public owner: string;
    public state: number;
    constructor(data: any) {
        super();
        if (data.lat && data.lng) {
            this.location.setLocation(data.lat, data.lng);
        }
        if (data.created) {
            this.setCreated(data.created);
        }
    }
}





