import { GetMenus } from './../../domain/use-case/menu/get-menus';
import { map } from 'rxjs';
import { prisma } from "../../data";
import { AccountMenuItemDatasource, AccountMenuItemEntity, CreateAccountMenuItemDto, MenuEntity, UpdateAccountMenuItemDto } from "../../domain";
import { ErrorSpecific } from "../../helpers";

export class AccountMenuItemDataSourceInfra implements AccountMenuItemDatasource {
    async create(createDto: CreateAccountMenuItemDto): Promise<AccountMenuItemEntity> {
         const entity = await prisma.accountMenuItem.create({
            data:{
                AccountId: createDto.AccountId,
                SubMenuId: createDto.SubMenuId,
                AccountMenuId: createDto.AccountMenuId
            }
        });
        return AccountMenuItemEntity.fromObject( entity );
    }

    async getAll(Id:string): Promise<MenuEntity[]> {
      if ( Id === 'withoutlogin')
        return this.getMenuWithout();
      else 
        return this.getMenus( Id );     
    }

    async findById(id: string): Promise<AccountMenuItemEntity> {
        const entity = await prisma.accountMenuItem.findFirst({
            where:{
                Id:id
            }
        });

        if ( !entity ) throw ErrorSpecific.ErrorEmpty(`Id del menu relacionado:  ${ id } no encontrado`);
        return AccountMenuItemEntity.fromObject(entity);
    }
    
    async updateById(updateDto: UpdateAccountMenuItemDto): Promise<AccountMenuItemEntity> {
        await this.findById( updateDto.Id );   
            const updatedentity = await prisma.accountMenuItem.update({
                where:{
                    Id:updateDto.Id
                },
                data:{
                    AccountId: updateDto.AccountId,
                    SubMenuId: updateDto.SubMenuId,
                    AccountMenuId: updateDto.AccountMenuId
                }
            });

            return AccountMenuItemEntity.fromObject( updatedentity );
    }

    async deleteById(id: string): Promise<AccountMenuItemEntity> {
         await this.findById( id ); 
        const deleteentity = await prisma.accountMenuItem.delete({
            where:{
                Id:id
            }
        });

        return AccountMenuItemEntity.fromObject( deleteentity );
    }

    private async getMenus(Id:string): Promise<MenuEntity[]>{
        const account = await prisma.accounts.findFirst({
        where: {
          Id: Id,
          State: 1
        },
        select: {
          Id: true,
          UserName: true,
          UserId: true,
          Role: true,
          State: true
        }
      });

      if (!account) {
        throw new Error('Usuario no encontrado');
      }
      
      const menus = await prisma.accountMenus.findMany({
        where:{
          AccountId:Id
        },
        orderBy:{
          Menu:{
            Position:'asc'
          }
        },
        include:{
          Menu:{
            include:{
              SubMenu:true
            },
          }
        }
      });
    return menus.map(entity => MenuEntity.fromObject(entity.Menu));  
    }  

    private async getMenuWithout(): Promise<MenuEntity[]>{       

      // Obtener menús con submenús y permisos
      const menus = await prisma.menues.findMany({
        where: {
          Name:{
            notIn: ['ABM', 'Asignar menu']
          }
          
        },
        orderBy:{
          Position:'asc'
        },
        include: {
          SubMenu: {
            where: {
              State: 1
            },
          }
        }
      });
    return menus.map(entity => MenuEntity.fromObject(entity));  
    }   
}