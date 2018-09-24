export interface PolyFilterData{
    type: Number;
    r_NE?: {lat: Number, lng: Number};
    r_SW?: {lat: Number, lng: Number};
    c_centre?: {lat: Number, lng: Number};
    c_rad?: Number;
    a_points?: Number[];
}
