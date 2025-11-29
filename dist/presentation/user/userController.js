"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const create_user_dto_1 = require("../../domain/dtos/user/create-user.dto");
const domain_1 = require("../../domain");
const library_1 = require("@prisma/client/runtime/library");
const helpers_1 = require("../../helpers");
class UserController {
    //** DI */
    constructor(Repository) {
        this.Repository = Repository;
        this.getUsers = (req, res) => {
            new domain_1.GetUsers(this.Repository)
                .execute()
                .then(todos => res.json(todos))
                .catch(error => {
                if (error instanceof library_1.PrismaClientKnownRequestError)
                    return helpers_1.ErrorSpecific.ErrorDB(error);
                return res.status(404).json({ error });
            });
        };
        this.get = (req, res) => {
            const id = req.params.id;
            new domain_1.GetUser(this.Repository)
                .execute(id)
                .then(todo => res.json(todo))
                .catch(error => {
                if (error instanceof library_1.PrismaClientKnownRequestError)
                    return helpers_1.ErrorSpecific.ErrorDB(error);
                return res.status(404).json({ error });
            });
        };
        this.post = (req, res) => {
            const [error, createuserDto] = create_user_dto_1.CreateUserDto.create(req.body);
            if (error)
                return res.status(400).json(error);
            new domain_1.CreateUser(this.Repository)
                .execute(createuserDto, createuserDto === null || createuserDto === void 0 ? void 0 : createuserDto.auth)
                .then(todo => res.json(todo))
                .catch(error => {
                if (error instanceof library_1.PrismaClientKnownRequestError)
                    return helpers_1.ErrorSpecific.ErrorDB(error);
                return res.status(404).json({ error });
            });
        };
        this.put = (req, res) => {
            const Id = req.params.id;
            const id = req.params.id;
            console.log('ID recibido:', id, '| Primer carácter:', id.charAt(0));
            console.log('Objeto combinado:', Object.assign(Object.assign({}, req.body), { id }));
            const [error, updateTodoDto] = domain_1.UpdateUserDto.update(Object.assign(Object.assign({}, req.body), { Id }));
            if (error)
                return res.status(400).json(error);
            new domain_1.UpdateUser(this.Repository)
                .execute(updateTodoDto)
                .then(todo => res.json(todo))
                .catch(error => {
                console.log('Error capturado en el controlador:', error);
                if (error instanceof library_1.PrismaClientKnownRequestError)
                    return helpers_1.ErrorSpecific.ErrorDB(error);
                return res.status(404).json({ error });
            });
        };
        this.delete = (req, res) => {
            const id = req.params.id;
            new domain_1.DeleteUser(this.Repository)
                .execute(id)
                .then(todo => res.json(todo))
                .catch(error => {
                if (error instanceof library_1.PrismaClientKnownRequestError)
                    return helpers_1.ErrorSpecific.ErrorDB(error);
                return res.status(404).json({ error });
            });
        };
    }
}
exports.UserController = UserController;
