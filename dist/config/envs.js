"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    PUBLIC_PATH: (0, env_var_1.get)('PUBLIC_PATH').default('public').asString(),
    APP_API_VERSION: (0, env_var_1.get)('APP_API_VERSION').default('v1').asString(),
    JWT_SEED: (0, env_var_1.get)('JWT_SEED').default('28af4a68-0626-431c-b1b5-6eaf8c81cb99').asString(),
    MAILER_SERVICE: (0, env_var_1.get)('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: (0, env_var_1.get)('MAILER_EMAIL').required().asString(),
    MAILER_SECRET_KEY: (0, env_var_1.get)('MAILER_SECRET_KEY').required().asString(),
    SEND_EMAIL: (0, env_var_1.get)('SEND_EMAIL').default('false').asBool(),
    WEBSERVICE_URL: (0, env_var_1.get)('WEBSERVICE_URL').required().asString(),
    CLOUD_NAME: (0, env_var_1.get)('CLOUD_NAME').required().asString(),
    CLOUDINARY_API_KEY: (0, env_var_1.get)('CLOUDINARY_API_KEY').required().asString(),
    CLOUDINARY_API_SECRET: (0, env_var_1.get)('CLOUDINARY_API_SECRET').required().asString(),
    CLOUDINARY_UPLOAD_PRESET: (0, env_var_1.get)('CLOUDINARY_UPLOAD_PRESET').required().asString(),
    CLOUD_URL: (0, env_var_1.get)('CLOUD_URL').required().asString(),
    VERSION: (0, env_var_1.get)('VERSION').default('v1').asString(),
    BASE_UPLOAD_PRESET: (0, env_var_1.get)('BASE_UPLOAD_PRESET').required().asString(),
    STRIPE_SECRET_KEY: (0, env_var_1.get)('STRIPE_SECRET_KEY').required().asString(),
    STRIPE_PUBLIC_KEY: (0, env_var_1.get)('STRIPE_PUBLIC_KEY').required().asString(),
};
