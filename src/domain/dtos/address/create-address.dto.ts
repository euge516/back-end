import { JsonObject } from "@prisma/client/runtime/library";
import { ErrorSpecific } from "../../../helpers";

export class CreateAddressDto{
    constructor(
        public readonly UserId: string,
        public readonly LocationId: string,
        public readonly Street:string,
        public readonly StreetNumber:string,
        public readonly BetweenStreet: string
    ){}

    get Values(){
        const returnObj:{[key: string]:any} ={};

        if ( this.UserId )  returnObj.UserId = this.UserId;
        if ( this.LocationId )  returnObj.LocationId = this.LocationId;
        if ( this.Street )   returnObj.Street = this.Street;
        if ( this.StreetNumber )  returnObj.StreetNumber = this.StreetNumber;
        if ( this.BetweenStreet )  returnObj.Phone = this.BetweenStreet;       

        return returnObj;
    }

    static create(props:{[key:string]:any}):[JsonObject?,CreateAddressDto?]{
        const{UserId, LocationId, Street, StreetNumber, BetweenStreet } = props;

        if ( !LocationId ) return [ErrorSpecific.ErrorEmpty('Debe ingresar la localidad'),undefined];
        if ( !Street ) return [ErrorSpecific.ErrorEmpty('Debe ingresar el nombre de la calle'),undefined];
        if ( !StreetNumber ) return [ErrorSpecific.ErrorEmpty('Debe ingresar el numero de la casa'), undefined];
        if ( !BetweenStreet ) return [ErrorSpecific.ErrorEmpty('Debe ingresar la interseccion entre que calla a que calle'), undefined];       

        return [undefined, new CreateAddressDto(UserId, LocationId, Street, StreetNumber, BetweenStreet )]
    }
}