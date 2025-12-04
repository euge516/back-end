"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepositoryInfra = void 0;
class AuthRepositoryInfra {
    constructor(datasource) {
        this.datasource = datasource;
    }
    AllAccount() {
        return this.datasource.AllAccount();
    }
    Login(LoginUser) {
        return this.datasource.Login(LoginUser);
    }
    validateEmail(token) {
        return this.datasource.ValidateEmail(token);
    }
    ChangePass(updateDto) {
        return this.datasource.ChangePass(updateDto);
    }
}
exports.AuthRepositoryInfra = AuthRepositoryInfra;
