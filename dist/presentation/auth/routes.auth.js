"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("./authController");
const auth_datasource_infra_1 = require("../../infractructure/datasource/auth.datasource.infra");
const auth_repository_infra_1 = require("../../infractructure/repositories/auth.repository.infra");
const authtoken_1 = require("../../Middlewares/authtoken");
class AuthRoutes {
    static get route() {
        const router = (0, express_1.Router)();
        const datasource = new auth_datasource_infra_1.AuthDataSourceInfra();
        const todoRepository = new auth_repository_infra_1.AuthRepositoryInfra(datasource);
        const ctrl = new authController_1.AuthController(todoRepository);
        router.post('/', ctrl.login);
        router.post('/logout', ctrl.logout);
        router.get('/allaccount', ctrl.allAccount);
        router.get('/validate-email/:token', ctrl.validateEmail);
        router.use(authtoken_1.AuthToken);
        router.put('/change/:id', authtoken_1.AuthToken, ctrl.ChangePassword);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
