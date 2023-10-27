import { Member } from "./member";

export interface Attendance {
    id?:number;
    dateIn: string;
    dateOut: string;
    member: Member;
}
