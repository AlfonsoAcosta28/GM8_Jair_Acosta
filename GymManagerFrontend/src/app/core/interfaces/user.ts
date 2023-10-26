export interface User {
    id?:string;
    email: string;
    password: string;
    userName: string;
    // lastName: string;
    phoneNumber: string;
    // status: boolean;
}

export interface UserUpdate {
    id?:string;
    password: string;
    userName: string;
    phoneNumber: string;
}

export interface signIn{
    userName: string;
    password: string;
}



export interface signResponse{
    message: string;
    status: number;
}