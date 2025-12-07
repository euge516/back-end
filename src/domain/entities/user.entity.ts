import { LoginEntity } from "./login.entity";

export class UserEntity{
    constructor(
        public readonly Id:string,
        public readonly FirstName: string,
        public readonly LastName: string,
        public readonly Address:string,
        public readonly Email:string,
        public readonly Phone: string,
        public readonly PhoneNumber: string,
        public readonly Accounts:LoginEntity[],
        public readonly Addresses?: any[],
        public readonly State?: number
    ){ }

    static fromObject(object:{[key:string]:any}){
        const{ Id, FirstName, LastName, Address, Email,PhoneNumber, Phone,Accounts,Addresses, State} = object;

        return new UserEntity( Id,FirstName, LastName, Address, Email,PhoneNumber, Phone,Accounts, Addresses, State);
    }
}