export interface User {
    id?:string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    status: boolean;
}


export interface signIn{
    email: string;
    password: string;
}

export interface signUp{

}

export interface signResponse{
    message: string;
    status: number;
}