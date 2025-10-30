import { MenuEntity } from "./menu.entity";

export class AccountMenuEntity{
    constructor(
        public readonly Id: string,
        public readonly MenuId: string,
        public readonly AccountId: string,
        public readonly Menu: MenuEntity,

        // public readonly AccountMenu: AccountMenuEntity,
        // public readonly subMenu: SubMenuEntity[],
        // public readonly menu: MenuEntity
    ){}

    public static fromObject (object:{[key: string]:any}){
        const{Id, MenuId, AccountId,Menu } = object;  
        // SubMenu.map((submenu: any) => SubMenuEntity.fromObject(submenu))      
        return new AccountMenuEntity(Id, MenuId, AccountId, Menu );
    }
}