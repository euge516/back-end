import { Request, Response } from "express";
import { CreateAccountMenuItemDto, UpdateAccountMenuItemDto } from "../../domain/dtos/index";
import { AccountMenuItemRepository, GetAccountMenuItems, GetAccountMenuItem, CreateAccountMenuItem, UpdateAccountMenuItem, DeleteAccountMenuItem } from '../../domain';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ErrorSpecific } from "../../helpers";


export class AccountMenuItemController{

    //** DI */
    constructor(
        private readonly Repository: AccountMenuItemRepository
    ){}

    public getAccountMenuItems = (req:Request, res:Response) =>{
        const id = req.params.id;
        new GetAccountMenuItems( this.Repository )
        .execute(id)
        .then( todos => res.json( todos ))
        .catch ( error =>  {
            console.log(error);
            if( error instanceof PrismaClientKnownRequestError)
                return ErrorSpecific.ErrorDB( error );
            return res.status(404).json({ error })}
        );
    }

    public get = (req:Request, res:Response) =>{
        const id = req.params.id;
        new GetAccountMenuItem( this.Repository )
        .execute( id )
        .then( todo => res.json(todo) )
        .catch ( error =>  {
            if( error instanceof PrismaClientKnownRequestError)
                return ErrorSpecific.ErrorDB( error );
            return res.status(404).json({ error })}
        );
    }

    public post = (req:Request, res:Response) =>{
        const [error, Dto] = CreateAccountMenuItemDto.create(req.body);
        if ( error ) return res.status(400).json(error);

       new CreateAccountMenuItem( this.Repository )
       .execute( Dto! )
       .then( todo => res.json(todo) )
       .catch ( error =>  {
            if( error instanceof PrismaClientKnownRequestError)
                return ErrorSpecific.ErrorDB( error );
            return res.status(404).json({ error })}
        );
    }

    public put = (req:Request, res:Response) =>{

        const id = +req.params.id;

        const [error, Dto] = UpdateAccountMenuItemDto.update({...req.body, id});
        if ( error ) return res.status(400).json(error);
     
        new UpdateAccountMenuItem( this.Repository )
        .execute( Dto! )
        .then( todo => res.json(todo) )
        .catch ( error =>  {
            if( error instanceof PrismaClientKnownRequestError)
                return ErrorSpecific.ErrorDB( error );
            return res.status(404).json({ error })}
        );
    }

    public delete = (req:Request, res:Response) =>{
        const id = req.params.id;
     
        new DeleteAccountMenuItem( this.Repository )
        .execute( id! )
        .then( todo => res.json(todo) )
        .catch ( error =>  {
            if( error instanceof PrismaClientKnownRequestError)
                return ErrorSpecific.ErrorDB( error );
            return res.status(404).json({ error })}
        );
    }
}