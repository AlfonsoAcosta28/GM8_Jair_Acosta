import { Member } from "./member";

export interface MembershipTypes {
    id?: number;
    name: string,
    cost: number,
    createdOn: string,
    duration: number,
    // members: Member[]
}
