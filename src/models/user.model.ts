export interface IUser {
    id: string;
    email: string;    
    password: string;
    confirmed: boolean;
    isDisabled: boolean;
}