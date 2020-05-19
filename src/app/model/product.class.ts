import { Vendor } from './vendor.class';

export class Product {
    id: number;
    vendor: Vendor;
    partNumber: string;
    name: string;
    price: number;
    unit: string;
    photopath: string;


    constructor(id: number = 0, vendor: Vendor = null,
                partNumber: string = "", name: string = "",
                price: number = 0, unit: string = "",
                photopath: string = "") {
            this.id = id;
            this.vendor = vendor;
            this.partNumber = partNumber;
            this.name = name;
            this.price = price;
            this.unit = unit;
            this.photopath = photopath;
	}

}
