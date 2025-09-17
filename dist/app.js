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
const server_1 = require("./presentation/server");
const envs_1 = require("./config/envs");
const routes_1 = require("./presentation/router/routes");
(() => __awaiter(void 0, void 0, void 0, function* () {
    main();
}))();
function main() {
    const server = new server_1.Server({
        PORT: envs_1.envs.PORT,
        PUBLIC_PATH: envs_1.envs.PUBLIC_PATH,
        ROUTER: routes_1.AppRoutes.route,
    });
    server.start();
}
