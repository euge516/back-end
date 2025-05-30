import 'dotenv/config';
import { get } from 'env-var';

export const envs ={

    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
    APP_API_VERSION: get('APP_API_VERSION').default('v1').asString(),  
    JWT_SEED:get('JWT_SEED').default('28af4a68-0626-431c-b1b5-6eaf8c81cb99').asString(),

    MAILER_SERVICE:get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL:get('MAILER_EMAIL').required().asString(),
    MAILER_SECRET_KEY:get('MAILER_SECRET_KEY').required().asString(),
    SEND_EMAIL:get('SEND_EMAIL').default('false').asBool(), 
    WEBSERVICE_URL:get('WEBSERVICE_URL').required().asString(), 
}