"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDataSourceInfra = void 0;
const bcrypt_adapter_1 = require("../../config/bcrypt.adapter");
const jwt_adapter_1 = require("../../config/jwt.adapter");
const data_1 = require("../../data");
const custom_error_1 = require("../../domain/error/custom.error");
class AuthDataSourceInfra {
    // constructor(
    //     // private readonly emailService: EmailService
    // ){}
    Login(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const existUser = yield data_1.prisma.accounts.findFirst({
                include: {
                    Role: true
                },
                where: {
                    UserName: dto.UserName
                }
            });
            if (!existUser)
                throw custom_error_1.CustomError.badRequest('No existe ese usuario');
            if (!existUser.EmailValidated)
                throw custom_error_1.CustomError.badRequest('No esta activada la cuenta');
            const isMatching = bcrypt_adapter_1.bcryptAdapter.compare(dto.Password, existUser.UserPass);
            if (!isMatching)
                throw custom_error_1.CustomError.badRequest('Usuario y/o contraseña incorrecto');
            let createtoken = yield jwt_adapter_1.JwtAdapter.generateToken({
                Id: existUser.Id,
                Email: existUser.UserName,
                UserId: existUser.UserId,
                Role: JSON.stringify(existUser.RoleId)
            });
            if (!createtoken)
                throw custom_error_1.CustomError.internalServer('Error al crear el token');
            return {
                UserName: existUser.UserName,
                token: createtoken
            };
        });
    }
    ValidateEmail(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield jwt_adapter_1.JwtAdapter.validateToken(token);
            if (!payload)
                throw custom_error_1.CustomError.unAuthorized('Token invalido');
            const { email } = payload;
            if (!email)
                throw custom_error_1.CustomError.internalServer('Email not in token');
            const user = yield data_1.prisma.accounts.findFirst({ where: {
                    UserName: email
                } });
            if (!user)
                throw custom_error_1.CustomError.internalServer('Email not exist');
            yield data_1.prisma.accounts.update({
                where: {
                    Id: user.Id
                },
                data: {
                    EmailValidated: true
                }
            });
            return true;
        });
    }
    ChangePass(updateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.findById(updateDto.id);
            const updatedaccount = yield data_1.prisma.accounts.update({
                where: {
                    Id: updateDto.id
                },
                data: {
                    UserPass: updateDto.UserPass
                }
            });
            return true;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield data_1.prisma.accounts.findFirst({
                where: {
                    Id: id
                }
            });
            if (!user)
                throw `Id usuario:  ${id} no encontrado`;
            return true;
        });
    }
}
exports.AuthDataSourceInfra = AuthDataSourceInfra;
