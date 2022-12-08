import dotenv from 'dotenv';

// reads config file
dotenv.config();
export default {
    PORT: process.env.PORT||4000,
    MONGODB_URL:   process.env.MONGODB_URL,      
    JWT_SECRET: process.env.JWT_SECRET,
   PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID, 
};