"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const domain_1 = require("../../domain");
const login_user_1 = require("../../domain/use-case/auth/login-user");
const validate_email_1 = require("../../domain/use-case/auth/validate-email");
const update_password_1 = require("../../domain/use-case/auth/update.password");
const library_1 = require("@prisma/client/runtime/library");
const helpers_1 = require("../../helpers");
const all_account_1 = require("../../domain/use-case/auth/all-account");
class AuthController {
    //** DI */
    constructor(Repository) {
        this.Repository = Repository;
        this.login = (req, res) => {
            const { UserName, UserPass: Password } = req.body;
            new login_user_1.Login(this.Repository)
                .execute({ UserName, Password })
                .then(todos => res.json(todos))
                .catch(error => {
                if (error instanceof library_1.PrismaClientKnownRequestError)
                    return helpers_1.ErrorSpecific.ErrorDB(error);
                return res.status(404).json({ error });
            });
        };
        this.allAccount = (req, res) => {
            new all_account_1.AllAccount(this.Repository)
                .execute()
                .then(todos => res.json(todos))
                .catch(error => {
                if (error instanceof library_1.PrismaClientKnownRequestError)
                    return helpers_1.ErrorSpecific.ErrorDB(error);
                return res.status(404).json({ error });
            });
        };
        this.logout = (req, res) => {
            var _a;
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
            if (token) {
                req.userlogin = null;
                res.json({ success: true, message: 'Sesión cerrada' });
            }
            else {
                res.json({ success: false, "No hubo session abierta": 'Sesión cerrada' });
            }
        };
        this.validateEmail = (req, res) => {
            const token = req.params.token;
            new validate_email_1.ValidateEmail(this.Repository)
                .execute(token)
                .then(todo => res.json(todo))
                .catch(error => {
                if (error instanceof library_1.PrismaClientKnownRequestError)
                    return helpers_1.ErrorSpecific.ErrorDB(error);
                return res.status(404).json({ error });
            });
        };
        this.ChangePassword = (req, res) => {
            const [error, Dto] = domain_1.UpdateAuthDto.update(req.body);
            if (error)
                return res.status(400).json(error);
            new update_password_1.ChangePassword(this.Repository)
                .execute(Dto)
                .then(todo => res.json(todo))
                .catch(error => {
                if (error instanceof library_1.PrismaClientKnownRequestError)
                    return helpers_1.ErrorSpecific.ErrorDB(error);
                return res.status(404).json({ error });
            });
        };
    }
}
exports.AuthController = AuthController;
