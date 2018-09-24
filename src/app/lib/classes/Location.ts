export class Location {
    private lat: number;
    private lng: number;
    private type: number; // 0 - manual, 1 - manual correction, 2 - by GPS device
    constructor(lat: number = 0, lng: number = 0, type: number = 0) {
        this.lat = lat;
        this.lng = lng;
        this.type = type;
    }
    public setLocation(lat: number = 0, lng: number = 0, type: number = 0) {
        this.lat = lat;
        this.lng = lng;
        if (type) { this.type = type; }
    }
    public getLocation() {
        return {
            lat: this.lat,
            lng: this.lng,
            type: this.type
        };
    }
    public setType(type: number = 2) {
        this.type = type;
    }
    public getType() {
        return this.type;
    }
}





