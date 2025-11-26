import { JsonObject } from "@prisma/client/runtime/library";
import { ErrorSpecific } from "../../../helpers";

export class UpdateProductDto{
    constructor(
        public readonly Id: string,
        public readonly SubCategoryId: string,
        public readonly PresentationId: string,
        public readonly SupplierId: string,
        public readonly Name: string,
        public readonly ImageUrl: string,
        public readonly PublicIdUrl: string,
        public readonly Description: string,
        public readonly IsOwn:  boolean
    ){}

    get Values(){
        const returnObj:{[key: string]:any} ={};

        if ( this.Id )  returnObj.Id = this.Id; 
        if (this.SubCategoryId) returnObj.SubCategoryId = this.SubCategoryId;
        if ( this.PresentationId ) returnObj.PresentationId = this.PresentationId;
        if ( this.SupplierId ) returnObj.SupplierId = this.SupplierId;
        if ( this.Name )  returnObj.Name = this.Name;
        if ( this.ImageUrl ) returnObj.ImageUrl = this.ImageUrl;
        if ( this.PublicIdUrl ) returnObj.PublicIdUrl = this.PublicIdUrl;
        if ( this.Description )  returnObj.Description = this.Description; 
        if ( this.IsOwn )  returnObj.IsOwn = this.IsOwn;      

        return returnObj;
    }

    static update(props:{[key:string]:any}):[JsonObject?,UpdateProductDto?]{
        const{Id,SubCategoryId, PresentationId, SupplierId, Name, ImageUrl,PublicIdUrl, Description,IsOwn } = props;
        
        if ( !Id )   return [ErrorSpecific.ErrorEmpty('Debe seleccionar el producto a modificar'),undefined];
        if ( !SubCategoryId ) return [ErrorSpecific.ErrorEmpty('Debe seleccionar la subcategoria del producto'),undefined]; 
        if ( !PresentationId ) return [ErrorSpecific.ErrorEmpty('Debe seleccionar la presentacion del producto'),undefined]; 
        if ( !SupplierId ) return [ErrorSpecific.ErrorEmpty('Debe seleccionar el proveedor del producto'),undefined]; 
        if ( !Name ) return [ErrorSpecific.ErrorEmpty('Debe ingresar el nombre del producto'),undefined];    

        return [undefined, new UpdateProductDto(Id,SubCategoryId, PresentationId, SupplierId, Name, ImageUrl,PublicIdUrl, Description,IsOwn )]
    }
}