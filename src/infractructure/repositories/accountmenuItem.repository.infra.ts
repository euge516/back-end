import { AccountMenuItemDatasource,MenuEntity, AccountMenuItemEntity, AccountMenuItemRepository, CreateAccountMenuItemDto, UpdateAccountMenuItemDto } from "../../domain";

 export class AccountMenuItemRepositoryInfra implements AccountMenuItemRepository{
    
    constructor(
        private readonly datasource: AccountMenuItemDatasource
    ){}
     create(createTodoDto: CreateAccountMenuItemDto): Promise<AccountMenuItemEntity> {
        return this.datasource.create( createTodoDto );
     }
     getAll(Id:string): Promise<MenuEntity[]> {
        return this.datasource.getAll( Id );
     }
     findById(id: string): Promise<AccountMenuItemEntity> {
        return this.datasource.findById( id );
     }
     updateById(updateTodoDto: UpdateAccountMenuItemDto): Promise<AccountMenuItemEntity> {
        return this.datasource.updateById( updateTodoDto );
     }
     deleteById(id: string): Promise<AccountMenuItemEntity> {
        return this.datasource.deleteById( id );
     }
 }