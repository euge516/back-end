import { LotEntity } from "./lot.entity";
import { PresentationEntity } from "./presentation.entity";
import { SubCategoryEntity } from "./subcategory.entity";
import { SupplierEntity } from "./supplier.entity";

export class ProductEntity{
    constructor(
        public readonly Id: string,
        public readonly SubCategoryId: string,
        public readonly PresentationId: string,
        public readonly SupplierId: string,
        public readonly Name: string,
        public readonly ImageUrl: string,
        public readonly PublicIdUrl: string,
        public readonly Description: string,
        public readonly IsOwn:  boolean,
        public readonly Lot: LotEntity[],
        public readonly Presentation: PresentationEntity,
        public readonly SubCategory: SubCategoryEntity,
        public readonly Supplier: SupplierEntity
    ){}

    public static fromObject (object:{[key: string]:any}){
        const{Id,SubCategoryId, PresentationId, SupplierId, Name, ImageUrl,PublicIdUrl, Description,IsOwn, lots, Presentation, SubCategory, Supplier } = object;    
        return new ProductEntity(Id,SubCategoryId, PresentationId,SupplierId, Name, ImageUrl,PublicIdUrl, Description,IsOwn, lots, Presentation, SubCategory, Supplier );
    }
}