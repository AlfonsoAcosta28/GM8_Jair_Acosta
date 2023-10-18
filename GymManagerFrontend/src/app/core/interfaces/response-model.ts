export interface ResponseModel<T> {
    hasError: boolean;
    message: string;
    model: T;
    requestId: string;
}

export interface ResponseArrayModel<T> {
    hasError: boolean;
    message: string;
    model: T[];
    requestId: string;
}
