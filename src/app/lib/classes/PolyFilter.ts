import { PolyFilterData } from './PolyFilterData';

export class PolyFilter {
    type: Number;
    r_NE?: {lat: Number, lng: Number};
    r_SW?: {lat: Number, lng: Number};
    c_centre?: {lat: Number, lng: Number};
    c_rad?: Number;
    a_points?: any[];

    constructor(data: PolyFilterData) {
        this.type = data.type;
        if (data.r_NE) {this.r_NE = data.r_NE; }
        if (data.r_SW) {this.r_SW = data.r_SW; }
        if (data.c_centre) {this.c_centre = data.c_centre; }
        if (data.c_rad) {this.c_rad = data.c_rad; }
        if (data.a_points) {this.a_points = data.a_points; }
    }
}
