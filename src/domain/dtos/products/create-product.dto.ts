import { JsonObject } from "@prisma/client/runtime/library";
import { ErrorSpecific } from "../../../helpers";
import { CreateLotDto } from "../lot/create-lot.dto";

export class CreateProductDto{
    constructor(
        public readonly SubCategoryId: string,
        public readonly PresentationId: string,
        public readonly SupplierId: string,
        public readonly Name: string,
        public readonly ImageUrl: string,
        public readonly PublicIdUrl: string,
        public readonly Description: string,
        public readonly IsOwn:  boolean,
        public readonly lot: CreateLotDto
    ){}

    get Values(){
        const returnObj:{[key: string]:any} ={};

        if (this.SubCategoryId) returnObj.SubCategoryId = this.SubCategoryId;
        if ( this.PresentationId ) returnObj.PresentationId = this.PresentationId;
        if ( this.SupplierId ) returnObj.SupplierId = this.SupplierId;
        if ( this.Name )  returnObj.Name = this.Name;
        if ( this.ImageUrl ) returnObj.ImageUrl = this.ImageUrl;
        if ( this.PublicIdUrl ) returnObj.PublicIdUrl = this.PublicIdUrl;
        if ( this.Description )  returnObj.Description = this.Description;  
        if ( this.IsOwn )  returnObj.IsOwn = this.IsOwn;  
        if ( this.lot )  returnObj.lot = this.lot;        

        return returnObj;
    }

    static create(props:{[key:string]:any}):[JsonObject?,CreateProductDto?]{
        const{SubCategoryId, PresentationId,SupplierId, Name, ImageUrl,PublicIdUrl, Description,IsOwn,lot } = props;

        if ( !SubCategoryId ) return [ErrorSpecific.ErrorEmpty('Debe seleccionar la subcategoria del producto'),undefined]; 
        if ( !SubCategoryId ) return [ErrorSpecific.ErrorEmpty('Debe seleccionar la subcategoria del producto'),undefined]; 
        if ( !SupplierId ) return [ErrorSpecific.ErrorEmpty('Debe seleccionar el proveedor del producto'),undefined]; 
        if ( !Name ) return [ErrorSpecific.ErrorEmpty('Debe ingresar el nombre del producto'),undefined]; 
        
        const [errorLot, lotDto] = CreateLotDto.create(lot);
        if ( errorLot) return [errorLot, undefined];

        return [undefined, new CreateProductDto(SubCategoryId, PresentationId,SupplierId, Name, ImageUrl,PublicIdUrl, Description,IsOwn,lotDto! )]
    }
}