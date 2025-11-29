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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const swagger_1 = __importDefault(require("./../swagger"));
const bigint_serializer_1 = require("../utils/bigint-serializer");
const bigint_middleware_1 = require("../Middlewares/bigint-middleware");
class Server {
    constructor(options) {
        this.app = (0, express_1.default)();
        const { PORT, ROUTER, PUBLIC_PATH = 'public' } = options;
        this.port = PORT;
        this.publicPath = PUBLIC_PATH;
        this.router = ROUTER;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            (0, bigint_serializer_1.configureBigIntSerialization)();
            //** Middlewares */
            this.app.use(express_1.default.json()); //* To transform the data to raw json example
            this.app.use(express_1.default.urlencoded({ extended: true })); //* In case you send the data in another way, for example x-www-form-urlencoded
            this.app.use((0, compression_1.default)());
            this.app.use((0, cors_1.default)());
            this.app.use(bigint_middleware_1.bigIntSerializer);
            //** Public folder */
            this.app.use(express_1.default.static(this.publicPath));
            //** Routes */
            this.app.use(this.router);
            /**
             * Swagger implementation
             */
            this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
            this.app.get('*', (req, res) => {
                const indexPath = path_1.default.join(__dirname + `../../../${this.publicPath}/index.html`);
                res.sendFile(indexPath);
            });
            this.app.listen(this.port, () => {
                console.log(`Running port ${this.port}`);
            });
        });
    }
}
exports.Server = Server;
