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
exports.UserDataSourceInfra = void 0;
const bcrypt_adapter_1 = require("../../config/bcrypt.adapter");
const envs_1 = require("../../config/envs");
const jwt_adapter_1 = require("../../config/jwt.adapter");
const data_1 = require("../../data");
const user_entity_1 = require("../../domain/entities/user.entity");
const helpers_1 = require("../../helpers");
const custom_error_1 = require("../../helpers/error/custom.error");
class UserDataSourceInfra {
    constructor(emailService) {
        this.emailService = emailService;
        this.sendEmailValidattionLink = (token, email, fullName) => __awaiter(this, void 0, void 0, function* () {
            // const token = await JwtAdapter.generateToken({ email });
            if (!token)
                throw custom_error_1.CustomError.internalServer("Error getting token");
            const link = `${envs_1.envs.WEBSERVICE_URL}/${envs_1.envs.APP_API_VERSION}/auth/validate-email/${token}`;
            const html = `
           <div class="container">
                <img src="https://emprenderconactitud.com/img/nety.png" alt="Logo" style="height: 100px; margin: 0 auto 20px; display: block;">
                <h1 class="header">¡Ya casi estás listo/a!</h1>
                <p>Hola, ${fullName}:</p>
                <p>Para completar la registración de tu cuenta y comenzar a disfrutar de los beneficios de [Nombre de la Plataforma], necesitamos confirmar que tenemos tu dirección de correo electrónico correcta.</p>
                <a href="${link}" class="button">Verificar correo electrónico</a>
                <p class="footer">Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>
                <p class="footer">Atentamente,</p>
                <p class="footer">Equipo de soporte</p>
            </div>
        `;
            const option = {
                to: email,
                subject: "Validate your email",
                htmlBody: html,
            };
            const isSent = yield this.emailService.sendEmail(option);
            if (!isSent)
                throw custom_error_1.CustomError.internalServer("Error sending email");
            return true;
        });
    }
    create(createuserDto, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield data_1.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    const existUser = yield data_1.prisma.users.findFirst({
                        where: { Email: createuserDto.Email },
                        select: { Email: true },
                    });
                    let role = yield data_1.prisma.roles.findFirst({
                        where: { Name: "Usuario" },
                    });
                    let roleId = auth.RoleId == undefined ? auth.RoleId : role === null || role === void 0 ? void 0 : role.Id;
                    if (existUser)
                        throw custom_error_1.CustomError.badRequest("Ya existio ese email");
                    let pass = bcrypt_adapter_1.bcryptAdapter.has(auth.UserPass);
                    const User = yield tx.users.create({
                        data: {
                            FirstName: createuserDto.FirstName,
                            LastName: createuserDto.LastName,
                            State: 1,
                            PhoneNumber: createuserDto.Phone,
                            Email: createuserDto.Email,
                            CreatedDate: new Date(Date.now()),
                            Addresses: {
                                create: [
                                    {
                                        Between: createuserDto.Address.BetweenStreet,
                                        CreatedDate: new Date(Date.now()),
                                        Country: createuserDto.Address.Country,
                                        Province: createuserDto.Address.Province,
                                        Location: createuserDto.Address.Location,
                                        Number: createuserDto.Address.StreetNumber,
                                        Street: createuserDto.Address.Street,
                                    },
                                ],
                            },
                        },
                    });
                    let account = yield tx.accounts.create({
                        data: {
                            UserId: User.Id,
                            UserName: auth.UserName,
                            RoleId: roleId,
                            State: 1,
                            UserPass: pass,
                            CreatedDate: new Date(Date.now()),
                            EmailValidated: false,
                        }
                    });
                    let menu = yield data_1.prisma.menues.findMany({
                        where: {
                            State: 1
                        }
                    });
                    for (let index = 0; index < menu.length; index++) {
                        const element = menu[index];
                        if (element.Name !== 'ABM' && element.Name !== 'Asignar menu') {
                            let accountmenu = yield tx.accountMenus.create({
                                data: {
                                    MenuId: element.Id,
                                    AccountId: account.Id,
                                    CreatedDate: new Date(Date.now()),
                                }
                            });
                            let submenu = yield data_1.prisma.subMenues.findMany({
                                where: {
                                    AND: [
                                        { MenuId: element.Id },
                                        { State: 1 }
                                    ]
                                }
                            });
                            for (let index = 0; index < submenu.length; index++) {
                                const element = submenu[index];
                                yield tx.accountMenuItem.create({
                                    data: {
                                        SubMenuId: element.Id,
                                        AccountMenuId: accountmenu.Id,
                                        AccountId: account.Id
                                    }
                                });
                            }
                        }
                    }
                    //* JWT <----- Para mantener la autencation
                    const token = yield jwt_adapter_1.JwtAdapter.generateToken({
                        Id: account.Id,
                        UserId: User.Id,
                        RoleId: roleId,
                        UserName: auth.UserName,
                        Email: User.Email,
                        Role: role === null || role === void 0 ? void 0 : role.Name,
                    });
                    yield this.sendEmailValidattionLink(token, User.Email, User.FirstName + " " + User.LastName);
                    return {
                        UserName: auth.UserName,
                        token: token,
                    };
                }));
            }
            catch (error) {
                console.error("Transaccion fallido: ", error);
                throw error;
            }
            finally {
                yield data_1.prisma.$disconnect();
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield data_1.prisma.users.findMany({
                include: {
                    Accounts: {
                        include: {
                            Role: true
                        }
                    },
                    Addresses: true
                }
            });
            return users.map((user) => user_entity_1.UserEntity.fromObject(user));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield data_1.prisma.users.findFirst({
                include: {
                    Accounts: true,
                },
                where: {
                    Id: id,
                },
            });
            if (!user)
                throw helpers_1.ErrorSpecific.ErrorEmpty(`Id usuario:  ${id} no encontrado`);
            return user_entity_1.UserEntity.fromObject(user);
        });
    }
    updateById(updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            console.log('ID en datasource:', updateUserDto.Id);
            console.log('updateUserDto.Values:', updateUserDto.Values);
            yield this.findById(updateUserDto.Id);
            const updateData = Object.assign({}, updateUserDto.Values);
            if (((_c = (_b = (_a = updateData.Accounts) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.UserPass) === '') {
                delete updateData.Accounts.update.data.UserPass;
            }
            const updatedContact = yield data_1.prisma.users.update({
                where: { Id: updateUserDto.Id },
                data: updateData,
            });
            return user_entity_1.UserEntity.fromObject(updatedContact);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.findById(id);
            if (!user)
                throw custom_error_1.CustomError.badRequest("No existe ese usuario");
            const deletecontact = yield data_1.prisma.users.update({
                where: {
                    Id: id,
                },
                data: {
                    State: 2,
                    FinalDate: new Date(Date.now()),
                    Accounts: {
                        updateMany: {
                            where: {
                                UserId: id,
                            },
                            data: {
                                State: 2,
                                FinalDate: new Date(Date.now()),
                                EmailValidated: false,
                            },
                        },
                    },
                },
                include: {
                    Accounts: true,
                },
            });
            return user_entity_1.UserEntity.fromObject(deletecontact);
        });
    }
}
exports.UserDataSourceInfra = UserDataSourceInfra;
