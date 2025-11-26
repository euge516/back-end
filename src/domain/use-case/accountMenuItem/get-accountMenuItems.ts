import { MenuEntity, AccountMenuItemRepository } from "../..";

export interface GetAccountMenuItemsUseCase {
    execute(Id: string):Promise<MenuEntity[]>;
}

export class GetAccountMenuItems implements  GetAccountMenuItemsUseCase{
    constructor(
        private readonly repostory: AccountMenuItemRepository
    ){}
    execute(Id:string): Promise<MenuEntity[]> {
        return this.repostory.getAll( Id );
    }
    
}