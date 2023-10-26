import { City } from "./city";
import { MembershipTypes } from "./membership-types";

export interface Member {
    id?: number
    name: string;
    lastName: string;
    birthDay: string;
    email: string;
    allowNewsLetter: boolean;
    registeredOn: string;
    membershipEnd: string;
    cityId: number;
    membershipTypeId: number;
}

export interface MemberShow {
    id?: number
    name: string;
    lastName: string;
    birthDay: string;
    email: string;
    allowNewsLetter: boolean;
    registeredOn: string;
    membershipEnd: string;
    city?: City;
    membershipType?: MembershipTypes;
}