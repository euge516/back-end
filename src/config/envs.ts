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

    CLOUD_NAME: get('CLOUD_NAME').required().asString(),
    CLOUDINARY_API_KEY: get('CLOUDINARY_API_KEY').required().asString(),    
    CLOUDINARY_API_SECRET: get('CLOUDINARY_API_SECRET').required().asString(),
    CLOUDINARY_UPLOAD_PRESET: get('CLOUDINARY_UPLOAD_PRESET').required().asString(),
    CLOUD_URL: get('CLOUD_URL').required().asString(),
    VERSION: get('VERSION').default('v1').asString(),   
    BASE_UPLOAD_PRESET: get('BASE_UPLOAD_PRESET').required().asString(),

    STRIPE_SECRET_KEY: get('STRIPE_SECRET_KEY').required().asString(),
    STRIPE_PUBLIC_KEY: get('STRIPE_PUBLIC_KEY').required().asString(),
}