import { FuneralParlor } from "./funeralParlor.type";

export interface Service {
    id?: number;

    name: string;
    description: string;
    rate: number;
    availability: boolean;
    createdAt?: Date;

    funeralParlorId?: number;
    funeralParlor?: FuneralParlor;

}