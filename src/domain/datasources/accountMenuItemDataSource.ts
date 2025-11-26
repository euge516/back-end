import { AccountMenuItemEntity,MenuEntity } from "..";
import { CreateAccountMenuItemDto, UpdateAccountMenuItemDto } from "../dtos";

export abstract class AccountMenuItemDatasource{
    abstract create(Dto: CreateAccountMenuItemDto): Promise<AccountMenuItemEntity>;
    abstract getAll(Id:string):Promise<MenuEntity[]>;
    abstract findById(id:string):Promise<AccountMenuItemEntity>;
    abstract updateById(Dto:UpdateAccountMenuItemDto):Promise<AccountMenuItemEntity>;
    abstract deleteById(id:string):Promise<AccountMenuItemEntity>;
}