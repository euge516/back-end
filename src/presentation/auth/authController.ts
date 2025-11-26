import { Request, Response } from "express";
import { AuthRepository, UpdateAuthDto} from "../../domain";
import { Login } from "../../domain/use-case/auth/login-user";
import { ValidateEmail } from "../../domain/use-case/auth/validate-email";
import { ChangePassword } from "../../domain/use-case/auth/update.password";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ErrorSpecific } from "../../helpers";
import { AllAccount } from "../../domain/use-case/auth/all-account";


export class AuthController{

    //** DI */
    constructor(
        private readonly Repository: AuthRepository
    ){}

    public login = (req:Request, res:Response) =>{
        const{ UserName, UserPass:Password} = req.body;
        new Login( this.Repository )
        .execute({ UserName, Password})
        .then( todos => res.json( todos ))
        .catch ( error =>  {
            if( error instanceof PrismaClientKnownRequestError)
                return ErrorSpecific.ErrorDB( error );
            return res.status(404).json({ error })}
        );
    }

    public allAccount = (req:Request, res:Response) =>{
        new AllAccount( this.Repository )
        .execute()
        .then( todos => res.json( todos ))
        .catch ( error =>  {
            if( error instanceof PrismaClientKnownRequestError)
                return ErrorSpecific.ErrorDB( error );
            return res.status(404).json({ error })}
        );
    }

    public logout = (req:any, res:Response) =>{

        const token = req.headers.authorization?.replace('Bearer ', '');
        if (token) {
           req.userlogin = null;
           res.json({ success: true, message: 'Sesión cerrada' });
        }
        else{
            res.json({ success: false, "No hubo session abierta": 'Sesión cerrada' });
        }
                
    }

    public validateEmail = (req:Request, res:Response) =>{
        const token = req.params.token;
        new ValidateEmail( this.Repository )
        .execute( token )
        .then( todo => res.json(todo) )
        .catch ( error =>  {
            if( error instanceof PrismaClientKnownRequestError)
                return ErrorSpecific.ErrorDB( error );
            return res.status(404).json({ error })}
        );
    }

    public ChangePassword = (req:Request, res:Response) =>{
        const [error, Dto] = UpdateAuthDto.update(req.body);
        if ( error ) return res.status(400).json(error);

       new ChangePassword( this.Repository )
       .execute( Dto! )
       .then( todo => res.json(todo) )
       .catch ( error =>  {
            if( error instanceof PrismaClientKnownRequestError)
                return ErrorSpecific.ErrorDB( error );
            return res.status(404).json({ error })}
        );
    }
}